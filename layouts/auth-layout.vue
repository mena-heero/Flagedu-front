<template>
  <div class="body">
    <div class="site-settings">
      <div class="setting-wrapper">
        <div class="theme">
          <i
            @click="changeTheme"
            v-if="$colorMode.preference == 'light'"
            class="bi bi-moon-fill"
          ></i>
          <i
            @click="changeTheme"
            v-if="$colorMode.preference == 'dark'"
            class="bi bi-brightness-high"
          ></i>
        </div>
        <div class="language">
          <div @click="languageDropdownToggle" class="current-language">
            {{ $i18n.locale.toUpperCase() }} <i class="bi bi-translate"></i>
          </div>
          <div
            class="lang-dropdown-container"
            v-if="openLanguageDropdown == true"
          >
            <div
              class="items"
              v-for="lang in $i18n.locales"
              :key="lang.code"
              @click="changeLanguage(lang.code)"
            >
              {{ lang.code.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "AuthLayout",
})
export default class AuthLayout extends Vue {
  openLanguageDropdown = false;

  languageDropdownToggle() {
    this.openLanguageDropdown = !this.openLanguageDropdown;
  }

  changeLanguage(lang) {
    this.$i18n.setLocale(lang);
    this.openLanguageDropdown = false;
  }

  changeTheme() {
    var currentTheme = this.$colorMode.value;
    if (currentTheme == "light") {
      this.$colorMode.preference = "dark";
    } else {
      this.$colorMode.preference = "light";
    }
  }
}
</script>

<style lang="scss">
.body {
  background-color: #1f3241;
}
.site-settings {
  position: fixed;
  top: 45%;
  right: 20px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  .setting-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-around;
  }
}
.language {
  width: 50px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(90deg, #dc5ced 0%, #25e1fb 100%);
  .current-language {
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 12px;
  }
  .lang-dropdown-container {
    position: absolute;
    top: 30px;
    padding: 10px;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .items {
      font-weight: 600;
      letter-spacing: 2px;
      cursor: pointer;
      color: var(--color);
    }
  }
}
.theme {
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #dc5ced 0%, #25e1fb 100%);
  border-radius: 8px;
  i {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
