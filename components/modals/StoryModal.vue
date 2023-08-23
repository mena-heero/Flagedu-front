<template>
  <div class="modal-backdrop">
    <div
      class="modal-container"
      :class="{ 'open-modal': modalOpen }"
      role="dialog"
      v-on-clickaway="close"
    >
      <div class="modal-body">
        <div class="udpate-wrapper">
          <div class="close-btn" @click="close">
            <i class="bi bi-x-circle-fill close-icon"></i>
          </div>
          <div class="profile-card">
            <div id="myProgress" dir="ltr">
              <div id="myBar"></div>
            </div>
            <img
              :src="
                HOST +
                renderLocaleImage(currentStory, 'image_detail', $i18n.locale)
              "
            />
            <div class="content">
              <div class="title">
                <a
                  v-if="currentStory.is_external == true"
                  :href="currentStory.link"
                  target="_blank"
                  >{{
                    renderLocaleField(currentStory, "title", $i18n.locale)
                  }}</a
                >
                <nuxt-link
                  v-else-if="
                    currentStory.is_external == false && currentStory.link
                  "
                  :to="currentStory.link"
                  >{{
                    renderLocaleField(currentStory, "title", $i18n.locale)
                  }}</nuxt-link
                >
                <div v-else>
                  {{ renderLocaleField(currentStory, "title", $i18n.locale) }}
                </div>
              </div>
            </div>
            <div
              class="next-btn"
              v-if="stories.length - 1 > storyPointer"
              @click="handleNext"
            >
              <i class="bi bi-caret-right-fill"></i>
            </div>
            <div class="prev-btn" @click="handlePrev" v-if="storyPointer != 0">
              <i class="bi bi-caret-left-fill"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Component,
  Vue,
  Prop,
  Getter,
  Action,
  Mutation,
} from "nuxt-property-decorator";
import { NS_USER } from "../../utils/store/namespace.names";
import {
  namespaced,
  renderLocaleField,
  renderLocaleImage,
} from "../../utils/utils";

@Component({
  name: "StoryModal",
  components: {},
})
export default class StoryModal extends Vue {
  @Prop() modalOpen;
  @Prop() stories;
  @Prop() storyIndex;

  storyPointer = 0;
  loading = false;
  intervalId = null;

  renderLocaleField = renderLocaleField;
  renderLocaleImage = renderLocaleImage;

  move() {
    clearInterval(this.intervalId);
    var i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      elem.style.width = "1%";
      var width = 1;
      this.intervalId = setInterval(frame, 50);
      var that = this;
      function frame() {
        if (width >= 100) {
          clearInterval(this.intervalId);
          i = 0;
          that.handleNext();
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }

  get currentStory() {
    return this.stories[this.storyPointer];
  }

  get totalStories() {
    return this.stories.length - 1;
  }

  handleNext() {
    if (this.storyPointer == this.totalStories) {
      this.storyPointer = 0;
    } else {
      this.storyPointer += 1;
    }
    this.move();
  }

  handlePrev() {
    if (this.storyPointer == 0) {
      this.storyPointer = this.totalStories;
    } else {
      this.storyPointer -= 1;
    }
    this.move();
  }

  get HOST() {
    return this.$config.HOST;
  }

  close() {
    clearInterval(this.intervalId);
    this.$emit("hideModal");
  }

  mounted() {
    this.storyPointer = this.storyIndex;
    this.move();
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 9999999999;
}

.modal-container {
  position: relative;
  min-height: 168px;
  // background-color: grey;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  // transform: scale(0);
  opacity: 0;

  @media (max-width: 400px) {
    width: 90%;
  }
}

.close {
  animation: close 0.8s forwards;
}

.udpate-wrapper {
  padding: 5px;
  position: relative;

  .close-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    @media (max-width: 430px) {
      display: block;
    }
    .close-icon {
      font-size: 30px;
      color: white;
    }
  }

  .profile-card {
    border-radius: 20px;
    padding: 25px 44px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 650px;
    width: 500px;
    position: relative;
    @media (max-width: 550px) {
      height: 80vh;
      width: 450px;
    }
    @media (max-width: 490px) {
      width: 100%;
    }
    @media (max-width: 400px) {
      padding: 0px;
    }
    img {
      flex-shrink: 0;
      -webkit-flex-shrink: 0;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 10px;
    }
    .content {
      color: white;
      margin-top: 10px;
      .title {
        a {
          color: white;
        }
      }
    }
    .next-btn {
      position: absolute;
      height: 50px;
      width: 50px;
      border-radius: 50px;
      background-color: white;
      right: -10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      @media (max-width: 490px) {
        right: 10px;
      }
    }
    .prev-btn {
      position: absolute;
      height: 50px;
      width: 50px;
      border-radius: 50px;
      background-color: white;
      left: -10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      @media (max-width: 490px) {
        left: 10px;
      }
    }
    i {
      font-size: 20px;
    }
  }
}

// modal overlay show animation
@keyframes bounceUp {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.95);
  }
  95% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes close {
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  30% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  0% {
    transform: scale(1);
  }
}
// modal overlay show animation

#myProgress {
  background-color: #ddd;
  position: absolute;
  top: 25px;
  width: 350px;
  margin: 0 auto;
  border-radius: 15px;
  @media (max-width: 550px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 250px;
  }
  @media (max-width: 750px) {
  }
}

#myBar {
  width: 1%;
  height: 3px;
  background-color: #000;
}
</style>
