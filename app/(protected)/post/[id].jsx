import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Story from "../../../components/Story";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Post from "../../../components/Post";
import Comment from "../../../components/Comment";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../../components/Input";

const PostDetails = () => {
  const { post } = useLocalSearchParams();

  const { id, image, isLiked } = JSON.parse(post);

  //   console.log(id);
  //   console.log(image);

  const comments = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
  ];

  return (
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
                            source={require("../../../assets/images/Profile Photo.png")}
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
                            Jacob Washington
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#727477",
                            }}
                          >
                            20m ago
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
                      {image && (
                        <View
                          style={{
                            width: 327,
                            height: 200,
                          }}
                        >
                          <Image
                            source={require("../../../assets/images/Rectangle 5.png")}
                            style={{
                              width: "100%",
                              height: "100%",
                              resizeMode: "contain",
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
                        “If you think you are too small to make a difference,
                        try sleeping with a mosquito.” ~ Dalai Lama
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", gap: 30 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {isLiked === true ? (
                          <AntDesign name="like1" size={24} color="#f62e8e" />
                        ) : (
                          <AntDesign name="like2" size={24} color="white" />
                        )}

                        <Text style={{ color: "white" }}>2,245</Text>
                      </View>
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
                        <Text style={{ color: "white" }}>45</Text>
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
                  Comments (45)
                </Text>
                {/* Comments holder */}
              </View>
            </View>
          )}
          data={comments}
          renderItem={(comment) => <Comment />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 25,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* <View
          style={{
            position: "absolute",
            width: "100%",
            height: 88,
            bottom: 0,
            backgroundColor: "black",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#323436",
              borderRadius: 32,
              // paddingTop: 20,
              marginTop: 20,
              height: 40,
              paddingLeft: 24,
              paddingRight: 5,
            }}
          >
            <TextInput
              placeholder="Type your comment here..."
              placeholderTextColor="#ECEBED"
              style={{
                color: "#ECEBED",
                fontSize: 14,
              }}
            />
            <LinearGradient
              colors={["rgb(246, 46, 143)", "rgb(172, 26, 239)"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="send" size={20} color="white" />
            </LinearGradient>
          </View>
        </View> */}
      <Input type="comment" />
    </View>
  );
};

export default PostDetails;
