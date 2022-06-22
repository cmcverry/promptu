const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const database = admin.firestore();

// Deployed function scheduledResetDB runs everyday at midnight PST
exports.scheduledResetDB = functions.pubsub.schedule("0 0 * * *")
    .timeZone("America/Los_Angeles")
    .onRun( (context) => {
      /**
       * Delete collection
       * Firebase documentation: https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
       * @param {object} db firestore admin sdk
       * @param {string} collectionPath path to collection
       * @param {int} batchSize number of documents to be deleted
       * @return {null} nothing returned
       */
      async function deleteCollection(db, collectionPath, batchSize) {
        const collectionRef = db.collection(collectionPath);
        const query = collectionRef.orderBy("__name__").limit(batchSize);

        return new Promise((resolve, reject) => {
          deleteQueryBatch(db, query, resolve).catch(reject);
        });
      }

      /**
         * Deletes batch of documents retrieved in query
         * @param {object} db firestore admin SDK
         * @param {object} query queried collection reference
         * @param {object} resolve Promise resolve case
         * @return {null} nothing returned
         */
      async function deleteQueryBatch(db, query, resolve) {
        const snapshot = await query.get();

        const batchSize = snapshot.size;
        if (batchSize === 0) {
          // When there are no documents left, we are done
          resolve();
          return;
        }

        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          deleteQueryBatch(db, query, resolve);
        });
      }

      // Hardcoded prompts
      const prompts = [
        {"prompt": "Which is your favorite animal, and why?",
          "hashtags": "#Animals #Cute #FavoriteThing"},
        {"prompt": "If someone gave you 20 dollars, what would you buy "+
        "with it?",
        "hashtags": "#Money #PersonalFinance #WhatIf"},
        {"prompt": "What are the top three things on your bucket list?",
          "hashtags": "#PersonalGrowth #Goals #Top3List"},
        {"prompt": "What's one movie you could watch over and over?",
          "hashtags": "#Movies #FavoriteThing"},
        {"prompt": "If you could only pack three things for a trip (besides "+
        "clothing) what would it be?",
        "hashtags": "#Trips #Vacation #Top3List #WhatIf"},
        {"prompt": "What's the strangest question you have been asked in "+
        "a job interview?",
        "hashtags": "#Work #JobSearch"},
        {"prompt": "Who is the most powerful DC comic book villan?",
          "hashtags": "#Superhero #GraphicNovel #DC"},
        {"prompt": "Who is the weakest Marvel superhero?",
          "hashtags": "#SuperHero #GraphicNovel #DC"},
        {"prompt": "How would you spend your winnings if you won the" +
        " lottery?",
        "hashtags": "#Money #PersonalFinance #WhatIf"},
        {"prompt": "If you were stranded on an island for eternity" +
        " name three books you would need in your possession.",
        "hashtags": "#Hypothetical #WhatIf #Top3List"},
        {"prompt": "If you could choose to have any superpower, which" +
        " one would you choose?",
        "hashtags": "#Superhero #Fun #WhatIf"},
        {"prompt": "Dogs or Cats? Which is the better pet?",
          "hashtags": "#Animals #Cute #Fun"},
        {"prompt": "If you could live anywhere in the world,"+
        " where would you choose?",
        "hashtags": "#WhatIf #Lifestyle #Places"},
      ];

      /**
       * Shuffles array of prompts
       * @param {object} prompts array of hardcoded prompts
       * @return {object} returns shuffled array of prompts
       */
      function shufflePrompts(prompts) {
        for (let j, x, i = prompts.length; i; j = Math.floor(Math.random() * i),
        x = prompts[--i],
        prompts[i] = prompts[j],
        prompts[j] = x);
        return prompts;
      }

      const shuffledPrompts = shufflePrompts(prompts);

      let i = 0;
      while (i < 5) {
        deleteCollection(database, "comments/prompt"+i.toString()+
        "/userComments", 255);
        database.collection("prompts").doc(i.toString())
            .update({hashtags: shuffledPrompts[i]["hashtags"],
              prompt: shuffledPrompts[i]["prompt"]});
        i++;
      }
    });
