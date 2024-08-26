import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Post from "./Post";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/Auth";
// import { process.env.EXPO_PUBLIC_API_URL } from "@env";

const Profile = ({ myProfile, userId }) => {
  // console.log(myProfile);
  const [selectedTab, setSelectedTab] = useState("posts");
  const [showLogout, setShowLogout] = useState(false);
  const { signout } = useAuth();
  const [posts, setPosts] = useState([]);

  const getUserPosts = async () => {
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/posts/user/${userId}`
      );
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPosts();

    // console.log(posts);
  }, []);

  const myLikes = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              marginTop: 30,
              alignItems: "center",
              gap: 20,
              flex: 1,
            }}
          >
            <View
              style={{
                zIndex: 1,
                position: "absolute",
                right: 15,
                top: 6,
              }}
            >
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="#727477"
                onPress={() => {
                  setShowLogout(!showLogout);
                }}
              />
              {showLogout && (
                <TouchableOpacity
                  onPress={signout}
                  style={{
                    width: 100,
                    height: 40,
                    position: "absolute",
                    right: 5,
                    top: 30,
                    backgroundColor: "#383d42",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <LinearGradient
              colors={["rgb(246, 46, 143)", "rgb(172, 26, 239)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "95%",
                  height: "95%",
                  borderRadius: 150,
                  backgroundColor: "#181a1c",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: posts[0]?.profilepictureurl }}
                  style={{
                    width: "90%",
                    height: "90%",
                    resizeMode: "cover",
                    borderRadius: 150,
                  }}
                />
              </View>
            </LinearGradient>

            <View
              style={{
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                }}
              >
                {posts[0]?.username}
              </Text>
              {/* <Text
                style={{
                  color: "#727477",
                  fontSize: 14,
                }}
              >
                Brooklyn, NY
              </Text> */}
              <Text
                style={{
                  // color: "#ECEBED",
                  color: "#727477",
                  fontSize: 14,
                }}
              >
                Writer by Profession. Artist by Passion!
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 24,
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  {posts[0]?.followers}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#727477",
                  }}
                >
                  Followers
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  {posts[0]?.following}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "#727477",
                  }}
                >
                  Following
                </Text>
              </View>

              <View
                style={{
                  width: 133,
                  height: 40,
                }}
              >
                {myProfile ? (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderRadius: 30,
                      borderColor: "#727477",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: "white",
                      }}
                    >
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#f62e8e",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: "white",
                      }}
                    >
                      Follow
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBlockColor: "#323436",
                flexDirection: "row",
                // justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                // marginTop: 20,

                paddingHorizontal: 24,
                marginBottom: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setSelectedTab("posts");
                }}
                style={{
                  width: "50%",
                  alignItems: "center",
                  borderBottomWidth: selectedTab === "posts" ? 3 : 0,
                  borderBottomColor: "#2E8AF6",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "white",
                    paddingBottom: 10,
                  }}
                >
                  Posts
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSelectedTab("likes");
                }}
                style={{
                  width: "50%",
                  alignItems: "center",
                  borderBottomWidth: selectedTab === "likes" ? 3 : 0,
                  borderBottomColor: "#2E8AF6",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    color: "white",
                    paddingBottom: 10,
                  }}
                >
                  Liked
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        data={selectedTab === "posts" ? posts : myLikes}
        renderItem={(post) => <Post post={post.item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 15,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Profile;
