import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingSpinner() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    justifyContent: "space-around",
    padding: 10,
  },
});
