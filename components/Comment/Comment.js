import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Modal, Pressable, TextInput} from 'react-native';
import { getAuth } from "firebase/auth";
import styles from './CommentStyles';
import fb from '../../authSetup.js';
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment, deleteDoc } from 'firebase/firestore';
import { AntDesign, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';

const db = getFirestore(fb);

const Comment = (props) => {
    // props passed from Topic
    let {username, upvotes, bestBadges, worstBadges, body, commentId, listId} = props.comment;

    // Retrieve's username of current user
    const auth = getAuth();
    const displayName = auth.currentUser.displayName;

    // React Hooks
    const [counter, setCounter] = useState(upvotes);
    // const [bodyText, setBodyText] = useState(body);
    const [bestBadgeCounter, setBestBadgeCounter] = useState(bestBadges);
    const [worstBadgeCounter, setWorstBadgeCounter] = useState(worstBadges);
    const [decremented, setDecremented] = useState(false);
    const [incremented, setIncremented] = useState(false);
    const [bestBadgeincremented, setBestBadgeIncremented] = useState(false);
    const [worstBadgeincremented, setWorstBadgeIncremented] = useState(false);
    const [shouldShow, setShouldShow] = useState(true);
    const [goodBadge, showGoodBadge] = useState(false);
    const [badBadge, showBadBadge] = useState(false);
    const [fireBadge, showFireBadge] = useState(false);
    const [downTrendBadge, showDownTrendBadge] = useState(false);
    const [owner, setOwner] = useState(false);
    const [trashConfirm, showTrashConfirm] = useState(false);
    const [giveAwards, showGiveAwards] = useState(false);
    const [deletedComment, setDeletedComment] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = useState(body);

    // Adds '(you)' identifier string to current user's own comments 
    const checkOwner = async () => {
        if (username === displayName) {
            // showTrashbin(true);
            // showAwardButton(false);
            setOwner(true);
           
        }
    }
  
    // Checks for comments toggled as hidden by current user
    const checkComment = async () => {
        const checkHiddenComment = doc(db, "users/"+auth.currentUser.uid+"/hidden", commentId);
        let hiddenSnap = await getDoc(checkHiddenComment);
        if (hiddenSnap.exists()) {
            let hiddenData = hiddenSnap.data();
            if (hiddenData.hidden == true) {
                setShouldShow(false);
            }
        }
    }

    // Checks comment data for badges and displays them as appropiate
    const checkBadges = async () => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        const commentRef = doc(db, commentPath, commentId);
        let commentSnap = await getDoc(commentRef);
        let commentData = commentSnap.data();

        if (commentData.bestBadges > 0) {
            showGoodBadge(true);
        }
        if (commentData.worstBadges > 0) {
            showBadBadge(true);
        }
        if (commentData.consecUpvotes >= 5) {
            showFireBadge(true);
        }
        if (commentData.consecDownvotes >= 5) {
            showDownTrendBadge(true);
        }    
    }


    // User action: delete a comment
    const deleteComment = async () => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        await deleteDoc(doc(db, commentPath, commentId));
        showTrashConfirm(false);
        setDeletedComment(true);
        setBestBadgeCounter(null);
        setWorstBadgeCounter(null);
        return
    }


    //User action: edit a comment
    const editComment = async (text) => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        const commentRef = doc(db, commentPath, commentId);
        await updateDoc(commentRef, {
            body: text
        });
        setModalVisible(false);
        return
    }


    // User action: toggles a comment to be hidden
    const hideComment = async () => {
        const checkHiddenComment = doc(db, "users/"+auth.currentUser.uid+"/hidden", commentId);
        let hiddenSnap = await getDoc(checkHiddenComment);
        if (!hiddenSnap.exists()) {
            const hiddenCommentsPath = "users/"+auth.currentUser.uid+"/hidden";
            await setDoc(doc(db, hiddenCommentsPath, commentId), {
                hidden: true
            });
            setShouldShow(false);
        } else {
            let hiddenComments = hiddenSnap.data();
            if (hiddenComments.hidden == true) {
                await updateDoc(checkHiddenComment, {hidden: false});
                setShouldShow(true);
            } else {
                await updateDoc(checkHiddenComment, {hidden: true});
                setShouldShow(false);
            }
        }
    }


    // User action: increments comment's vote count
    const incrementVote = async () => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        const commentRef = doc(db, commentPath, commentId);
        const votesPath = "users/"+auth.currentUser.uid+"/votes";
        const voteRef = doc(db, votesPath, commentId);
        let voteSnap = await getDoc(voteRef);

        if (!voteSnap.exists()) {
            await setDoc(doc(db, votesPath, commentId), {
                upvoted: false,
                downvoted: false
            });
        }
        voteSnap = await getDoc(voteRef);
        let voteData = voteSnap.data();
        if(incremented || voteData.upvoted == true){

            return
        } else {
            if (decremented || voteData.downvoted == true){
                setDecremented(false);
                await updateDoc(voteRef, {downvoted: false});
                await updateDoc(commentRef, {upvotes: increment(1), consecUpvotes: increment(1), consecDownvotes: 0});
                setCounter(counter + 1);
                checkBadges();
            } else {
                setIncremented(true)
                await updateDoc(voteRef, {upvoted: true});
                await updateDoc(commentRef, {upvotes: increment(1), consecUpvotes: increment(1), consecDownvotes: 0});
                setCounter(counter + 1);
                checkBadges();
            }
            return
        }
    }

    // User action: adds "Best Badge" to comment (limited to 1 badge per prompt)
    const incrementBestBadge = async () => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        const commentRef = doc(db, commentPath, commentId);
        const badgesPath = "users/"+auth.currentUser.uid+"/badges";
        const badgeRef = doc(db, badgesPath, commentId);
        const badgeLimitPath = "users/"+auth.currentUser.uid+"/badgeLimit";
        const badgeLimitRef = doc(db, badgeLimitPath, listId.toString());

        let badgeLimitSnap = await getDoc(badgeLimitRef);
        if (!badgeLimitSnap.exists()) {
            await setDoc(doc(db, badgeLimitPath, listId.toString()), {
                usedBestBadge: false,
                usedWorstBadge: false
            });
        }

        let badgeSnap = await getDoc(badgeRef);
        if (!badgeSnap.exists()) {
            await setDoc(doc(db, badgesPath, commentId), {
                bestBadge: false,
                worstBadge: false
            });
        }

        badgeLimitSnap = await getDoc(badgeLimitRef);
        let badgeLimitData = badgeLimitSnap.data();
        badgeSnap = await getDoc(badgeRef);
        let badgeData = badgeSnap.data();
        if(bestBadgeincremented || badgeData.bestBadge == true || badgeLimitData.usedBestBadge == true){

            return showGiveAwards(!giveAwards)
        } else {
                setBestBadgeIncremented(true)
                await updateDoc(badgeRef, {bestBadge: true});
                await updateDoc(commentRef, {bestBadges: increment(1)});
                await updateDoc(badgeLimitRef, {usedBestBadge: true})
                setBestBadgeCounter(bestBadgeCounter + 1);
                showGoodBadge(true);
        }

        return showGiveAwards(!giveAwards)

    }

    // User action: adds "Worst Badge" to comment (limited to 1 badge per prompt)
    const incrementWorstBadge = async () => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        const commentRef = doc(db, commentPath, commentId);
        const badgesPath = "users/"+auth.currentUser.uid+"/badges";
        const badgeRef = doc(db, badgesPath, commentId);
        const badgeLimitPath = "users/"+auth.currentUser.uid+"/badgeLimit";
        const badgeLimitRef = doc(db, badgeLimitPath, listId.toString());

        let badgeLimitSnap = await getDoc(badgeLimitRef);
        if (!badgeLimitSnap.exists()) {
            await setDoc(doc(db, badgeLimitPath, listId.toString()), {
                usedBestBadge: false,
                usedWorstBadge: false
            });
        }

        let badgeSnap = await getDoc(badgeRef);
        if (!badgeSnap.exists()) {
            await setDoc(doc(db, badgesPath, commentId), {
                bestBadge: false,
                worstBadge: false
            });
        }

        badgeLimitSnap = await getDoc(badgeLimitRef);
        let badgeLimitData = badgeLimitSnap.data();
        badgeSnap = await getDoc(badgeRef);
        let badgeData = badgeSnap.data();
        if(worstBadgeincremented || badgeData.worstBadge == true || badgeLimitData.usedWorstBadge){

            return showGiveAwards(!giveAwards)
        } else {
                setWorstBadgeIncremented(true)
                await updateDoc(badgeRef, {upvoted: true});
                await updateDoc(commentRef, {worstBadges: increment(1)});
                await updateDoc(badgeLimitRef, {usedWorstBadge: true})
                setWorstBadgeCounter(worstBadgeCounter + 1);
                showBadBadge(true);
        }
        return showGiveAwards(!giveAwards)
    }

    // User action: decrements comment's vote count
    const decrementVote = async () => {
        const commentPath = "comments/prompt"+listId+"/userComments";
        const commentRef = doc(db, commentPath, commentId);
        const votesPath = "users/"+auth.currentUser.uid+"/votes";
        const voteRef = doc(db, votesPath, commentId);
        let voteSnap = await getDoc(voteRef);

        if (!voteSnap.exists()) {
            await setDoc(doc(db, votesPath, commentId), {
                upvoted: false,
                downvoted: false
            });
        }
        voteSnap = await getDoc(voteRef);
        let voteData = voteSnap.data();

        if(decremented || voteData.downvoted == true){
            return
        } else {
            if (incremented || voteData.upvoted == true){
                setIncremented(false);
                await updateDoc(voteRef, {upvoted: false});
                await updateDoc(commentRef, {upvotes: increment(-1), consecDownvotes: increment(1), consecUpvotes: 0});
                setCounter(counter - 1);
                checkBadges();
            } else {
                setDecremented(true)
                await updateDoc(voteRef, {downvoted: true});
                await updateDoc(commentRef, {upvotes: increment(-1), consecDownvotes: increment(1), consecUpvotes: 0});
                setCounter(counter - 1);
                checkBadges();
            }
            return
        }
    }

    useEffect(() => {
        checkBadges(); 
        checkComment();
        checkOwner();
    }, [])

    return (
        <View>
            <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Edit this comment:</Text>
                            <TextInput
                            style={styles.input}
                            // placeholder={body}
                            onChangeText={onChangeText}
                            value={text}
                            multiline = {true}
                            numberOfLines = {10}
                            maxLength={1000}
                            />
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>editComment(text)}
                            >
                            <Text style={styles.textStyle}>Submit</Text>
                            </Pressable>
                            
                        </View>
                        </View>
                    </Modal>
                </View>


         { !deletedComment ? ( <View style={styles.commentContainer}>
            
            {shouldShow ? (
            <View style={styles.voteButtons}>

                <TouchableOpacity onPress={incrementVote}>
                    <AntDesign name='arrowup' size={25}/>
                </TouchableOpacity>
                    
                <TouchableOpacity onPress={decrementVote}>
                    <AntDesign name='arrowdown' size={25}/>
                </TouchableOpacity>
                
            </View>

               ): null}

            {shouldShow ? (
            <View style={styles.voteCount}> 
                <Text style={styles.voteStyle}>{counter}</Text>
            </View>

             ): null}

            {shouldShow ? (
            <View style={{flex: 1}}>
                <Text style={styles.commentText}>
                    {owner ? (
                        <View style={styles.userContainer}>
                            <Text style={styles.userText}>{username}</Text>
                            <Ionicons name='person-circle-outline' size={18} />
                        </View>

                    ): <Text style={styles.userText}>{username}</Text>}
                    {"\n"}
                    <View style={styles.badgeContainer}>
                        {fireBadge ? (
                        <View style={styles.badgeInnerContainer}>
                            <View style={styles.badge}>
                            <MaterialIcons name='local-fire-department' size={18} color="orange"/>
                            </View>
                        </View>
            
                    ): null}
                    {downTrendBadge ? (
                    <View style={styles.badgeInnerContainer}>
                        <View style={styles.badge}>
                        <Ionicons name='trending-down' size={18} color="black"/>
                        </View>
                    </View>
        
                    ): null}
                    {goodBadge ? (
                    <View style={styles.badgeInnerContainer}>
                        <View style={styles.badge}>
                        <Ionicons name='thumbs-up-outline' size={18} color="black"/>
                        </View>
                        <View style={styles.badgeCount}> 
                            <Text style={styles.badgeStyle}>x{bestBadgeCounter}</Text>
                        </View>
                    </View>
            
                    ): null}
                    {badBadge ? (
                    <View style={styles.badgeInnerContainer}>
                        <View style={styles.badge}>
                            <Ionicons name='thumbs-down-outline' size={18} color="black"/>
                        </View>
                        <View style={styles.badgeCount}> 
                            <Text style={styles.badgeStyle}>x{worstBadgeCounter}</Text>
                        </View>
                    </View>
                    ): null}
                    </View>
                    {"\n"}
                    {"\n"}
                    <Text style={styles.bodyText}>{text}</Text>
                </Text>
             </View>

            ): null}
            
            <View style={styles.flagButton}>
                <TouchableOpacity onPress={() => hideComment()}>
                    <Entypo name='eye-with-line' size={18}/>
                </TouchableOpacity> 

            {(shouldShow && !owner) ? (
            <View style={styles.badgeButton}>
                <TouchableOpacity  onPress={() => showGiveAwards(!giveAwards)}>
                    <AntDesign name='gift' size={18}/>
                </TouchableOpacity>
                {(giveAwards) ? (
                    <View style={styles.awardInterface}>
                         <Pressable onPress={() => showGiveAwards(!giveAwards)} style={styles.exitAwardsButton}>
                            <Text>X</Text>
                        </Pressable>
                        <Text>Award a badge</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Pressable style={styles.awardBadgeButtons} onPress={incrementBestBadge}>
                                <Ionicons name='thumbs-up-outline' size={18} color="black"/>
                            </Pressable>
                            <Pressable style={styles.awardBadgeButtons} onPress={incrementWorstBadge}>
                                <Ionicons name='thumbs-down-outline' size={18} color="black"/>
                            </Pressable>
                        </View>
                    </View>
                ) : null }
            </View>
            ): null}  

            {(shouldShow && owner) ? ( 
            <View style={styles.trashContainer}>
               <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons name="pencil-outline" size={17}/>
                </TouchableOpacity>
            </View>
            ): null }

            {(shouldShow && owner) ? ( 
            <View style={styles.trashContainer}>
               <TouchableOpacity onPress={() => showTrashConfirm(!trashConfirm)}>
                    <Ionicons name="trash-outline" size={18}/>
                </TouchableOpacity>
                {(trashConfirm) ? (
                    <View style={styles.trashInterface}>
                        <Text style={{color:'red'}}>Delete this comment?</Text>
                        <Pressable style={styles.cancelTrash} onPress={() => deleteComment()}><Text style={styles.trashButtonText}>YES</Text></Pressable>
                        <Pressable style={styles.confirmTrash} onPress={() => showTrashConfirm(!trashConfirm)}><Text style={styles.trashButtonText}>NO</Text></Pressable>
                    </View>
                ) : null }
            </View>
            ): null }

            </View>         
        </View>
        ) : null }
    </View>
    );
};

export default Comment;