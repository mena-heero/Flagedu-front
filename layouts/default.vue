<template>
  <div>
    <Header />
    <div class="p-container">
      <div class="main-container">
        <Nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "Default",
})
export default class Default extends Vue {}
</script>

<style scoped lang="scss">
.main-container {
  padding-top: 130px;
  min-height: 500px;
  width: 100%;
  height: 100%;
  background-color: $bg-secondary;
}
</style>
