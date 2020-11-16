<template>
  <div class="Post">
    <Title></Title>
    <Article></Article>
  </div>
</template>

<script>
import Title from "../components/Title";
import Article from "../components/Article";

export default {
  name: "Post",
  components: {
    Title,
    Article,
  },
};
</script>

<style lang="stylus" scoped></style>