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
        {"prompt": `Representative for Kyiv has urged the United Nations'
         top court to order Russia to halt its devastating invasion of
          Ukraine, at a hearing snubbed by Russia`,
        "hashtags": "#WarInUkraine #WorldPolitics #Government"},
        {"prompt": `China is calling Russia its 'most important strategic
         partner' as Beijing continues to refuse to condemn the invasion
         of Ukraine despite growing pressure from the U.S. and EU to use
         its influence to urge Moscow to pull back`,
        "hashtags": "#China #Russian #WorldPolitics"},
        {"prompt": "The death toll from COVID-19 has surpassed 6 million",
          "hashtags": "#COVID-19 #Pandemic #WorldNews"},
        {"prompt": `The NHL has unveiled a new logo for the Stanley Cup
         playoffs and Final that replaces the one used for the last 13 years`,
        "hashtags": "#Sports #NHL #Hockey"},
        {"prompt": "Should hate speech be protected by the first amendment",
          "hashtags": "#Controversial #Social #USAGovernment #Politics"},
        {"prompt": `Should a business be able to deny service to a customer
         if the request conflicts with the owner's religious beliefs?`,
        "hashtags": "#Social #Politics #Controversial"},
        {"prompt": "Who is the most powerful DC comic book villan?",
          "hashtags": "#Superhero #GraphicNovel #DCComics"},
        {"prompt": "Who is the weakest Marvel superhero?",
          "hashtags": "#SuperHero #GraphicNovel #DCComics"},
        {"prompt": `Pete Davidson in talks to head to space on
         Jeff Bezos' Blue Origin flight`,
        "hashtags": "#Celebrity #PeteDavidson #JeffBezos #BlueOrigin"},
        {"prompt": `Walking Dead' walks on with 'Isle of the Dead' spinoff
         starring Maggie and Negan in Manhattan`,
        "hashtags": "#TV #WalkingDead #Entertainment"},
        {"prompt": `If you could choose to have any superpower, which
         one would you choose?`,
        "hashtags": "#Superhero #Fun"},
        {"prompt": "Dogs or Cats? Which is the better pet?",
          "hashtags": "#Animals #Cute #Fun"},
        {"prompt": `Thousands of acres near Panama City are torched
         as Florida Panhandle wildfires continue`,
        "hashtags": "#USANews #Florida #Wildfires"},
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
