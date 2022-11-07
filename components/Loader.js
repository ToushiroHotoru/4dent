import { Text, View, StyleSheet } from "react-native";
import { animated, config, useSpring } from "@react-spring/native";

const AnimatedView = animated(View);
const AnimatedText = animated(Text);

export default function Loader() {
  const viewAnimtation = useSpring({
    loop: true,
    from: {
      borderRadius: 50,
      rotateZ: 0,
      width: 50,
      height: 50,
      backgroundColor: "#d1e4e5",
    },
    to: {
      rotateZ: 150,
      width: 100,
      height: 100,
      backgroundColor: "#36f4fd",
    },
    config: { duration: 1000 },
  });

  return (
    <View style={styles.animContainer}>
      <AnimatedView style={viewAnimtation} />
    </View>
  );
}

const styles = StyleSheet.create({
  animContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
