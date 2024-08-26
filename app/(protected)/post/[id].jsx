import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Story from "../../../components/Story";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Post from "../../../components/Post";
import Comment from "../../../components/Comment";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../../components/Input";
// import { process.env.EXPO_PUBLIC_API_URL } from "@env";
import { useAuth } from "../../../context/Auth";

const PostDetails = () => {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newCommentAdded, setNewCommentAdded] = useState(false); // State to trigger re-fetch
  const [newLikeCount, setNewLikeCount] = useState();
  const [like, setLike] = useState();

  const addLike = async () => {
    setLike(!like);
    if (like) {
      setNewLikeCount(newLikeCount - 1);
    } else {
      setNewLikeCount(newLikeCount + 1);
    }
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          userId: user.id,
        }),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async () => {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/${id}`);
    const data = await res.json();
    if (data) {
      setPost(data);
      setNewLikeCount(data.likes);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/posts/comment/${id}`
      );
      const data = await res.json();
      if (data) {
        setComments(data);
      } else {
        console.log("No comments found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewComment = () => {
    setNewCommentAdded((prev) => !prev); // Toggle state to trigger re-fetch
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [newCommentAdded, newLikeCount]);

  // console.log(post);

  // const parsedPost = JSON.parse(post);
  // console.log(parsedPost.imageurl);

  // const isLiked = false;

  //   console.log(id);
  //   console.log(image);

  return (
    post && (
      <View
        style={{
          flex: 1,
          backgroundColor: "#181a1c",
        }}
      >
        <View
          style={{
            //   paddingTop: 20,
            //   paddingHorizontal: 24,
            marginBottom: 100,
          }}
        >
          {/* Comment */}
          <FlatList
            ListHeaderComponent={() => (
              <View>
                <View style={{ paddingTop: 20 }}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      paddingBottom: 25,
                      borderBottomColor: "#323436",
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 24,
                        gap: 15,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 32,
                            }}
                          >
                            <Image
                              source={{ uri: post.profilepictureurl }}
                              style={{
                                borderRadius: 32,
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </View>
                          <View style={{}}>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#ECEBED",
                              }}
                            >
                              {post.username}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#727477",
                              }}
                            >
                              {post.timestamp}
                            </Text>
                          </View>
                        </View>
                        <Image
                          source={require("../../../assets/images/Dots Vertical.png")}
                        />
                      </View>

                      <View
                        style={{
                          gap: 10,
                        }}
                      >
                        {post.imageurl && (
                          <View
                            style={{
                              width: 327,
                              height: 200,
                            }}
                          >
                            <Image
                              source={{ uri: post.imageurl }}
                              style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "stretch",
                                borderRadius: 10,
                              }}
                            />
                          </View>
                        )}

                        <Text
                          style={{
                            color: "#ECEBED",
                            fontSize: 16,
                            width: "90%",
                          }}
                        >
                          {post.caption}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row", gap: 30 }}>
                        <Pressable
                          onPress={addLike}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {like === true ? (
                            <AntDesign name="like1" size={24} color="#f62e8e" />
                          ) : (
                            <AntDesign name="like2" size={24} color="white" />
                          )}

                          <Text style={{ color: "white" }}>{newLikeCount}</Text>
                        </Pressable>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <FontAwesome5
                            name="comment-dots"
                            size={24}
                            color="white"
                          />
                          <Text style={{ color: "white" }}>
                            {post.comments}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 24,
                    paddingTop: 30,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      letterSpacing: 2,
                      color: "#ECEBED",
                    }}
                  >
                    Comments ({post.comments})
                  </Text>
                  {/* Comments holder */}
                </View>
              </View>
            )}
            data={comments}
            renderItem={(comment) => <Comment comment={comment.item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              gap: 25,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Input type="comment" onCommentAdded={handleNewComment} />
      </View>
    )
  );
};

export default PostDetails;
