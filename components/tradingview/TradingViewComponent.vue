<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <nuxt-link to="/companies">{{ data.title }}</nuxt-link>
      </div>
      <div class="company-wrapper">
        <div class="currency-wrapper">
          <div class="tabs">
            <div
              :class="{ 'tab-item': true, active: activeTab == item.title }"
              v-for="(item, idx) in data.tabs"
              :key="'tabs_' + idx"
              @click="handleChangeTab(item)"
            >
              {{ item.title }}
            </div>
          </div>
          <div class="tab-data">
            <div
              :class="{
                'tab-data-item': true,
                active: activeCurrency == item.stock.symbol,
              }"
              v-for="(item, didx) in tabDataItem"
              :key="'tabbeditem_' + didx"
              @click="activeCurrency = item.stock.symbol"
            >
              <div class="info">
                <div class="image">
                  <img
                    v-if="item.stock.logo_detail"
                    :src="HOST + item.stock.logo_detail.original.src"
                    :alt="item.stock.logo_detail.original.alt"
                  />
                  <img v-else src="/images/avatar.png" alt="profile" />
                </div>
                <div class="currency-name">
                  {{ item.stock.title }}
                </div>
              </div>
              <div class="changed-price"></div>
              <div class="current-rate"></div>
            </div>
          </div>
        </div>
        <div class="charts">
          <TradingViewChart :data="activeCurrency" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Component,
  Vue,
  Getter,
  Action,
  Prop,
  Watch,
} from "nuxt-property-decorator";
import TradingViewChart from "./TradingViewChart";

@Component({
  name: "TradingViewComponent",
  components: { TradingViewChart },
})
export default class TradingViewComponent extends Vue {
  @Prop() data;

  activeTab = "";
  tabDataItem = null;
  activeCurrency = "";
  renderComponent = true;

  @Watch("data", { immediate: true, deep: true })
  handleDataChange(val, oldVal) {
    this.activeTab = val.tabs[0].title;
    this.tabDataItem = val.tabs[0].stocks;
    this.activeCurrency = this.tabDataItem[0].stock.symbol;
  }

  handleChangeTab(item) {
    this.activeTab = item.title;
    for (var i = 0; i < this.data.tabs.length; i++) {
      if (this.activeTab == this.data.tabs[i].title) {
        this.tabDataItem = this.data.tabs[i].stocks;
        this.activeCurrency = this.tabDataItem[0].stock.symbol;
      }
    }
  }

  get HOST() {
    return this.$config.HOST;
  }
}
</script>

<style scoped lang="scss">
.company-block-container {
  background-color: $bg-primary;
  min-height: 500px;
  width: 100%;
  padding-bottom: 60px;
  .company-container {
    width: 80%;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 0 auto;
    min-height: 500px;
    @media (max-width: 1250px) {
      width: 95%;
      padding-bottom: 30px;
      padding-top: 30px;
    }
    .title {
      display: flex;
      a {
        width: 100%;
        font-size: 36px;
        font-weight: 700;
        color: $linked-font-color;
        @media (max-width: 1250px) {
          font-size: 30px;
        }
      }
    }
  }
}
.company-wrapper {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 0.6fr 1fr;
  gap: 50px;
  @media (max-width: 1250px) {
    margin-top: 30px;
    grid-template-columns: 0.8fr 1fr;
  }
  @media (max-width: 1160px) {
    margin-top: 30px;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 960px) {
    margin-top: 30px;
    grid-template-columns: 1fr;
  }
  @media (max-width: 700px) {
    margin-top: 30px;
    grid-template-columns: 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .charts {
  }
  .currency-wrapper {
    max-height: 500px;
    overflow: hidden;
    .tabs {
      display: flex;
      .tab-item {
        font-size: 16px;
        font-weight: 600;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 8px;
        cursor: pointer;
        @media (max-width: 1160px) {
          font-size: 14px;
        }
        @media (max-width: 1076px) {
          font-size: 14px;
        }
        &:hover {
          background-color: #f1f1f1;
        }
      }
    }
    .tab-data {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
      .tab-data-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 8px;
        cursor: pointer;
        @media (max-width: 960px) {
          justify-content: flex-start;
          gap: 50px;
        }
        @media (max-width: 700px) {
          justify-content: space-between;
          gap: 50px;
        }
        &:hover {
          background-color: #f1f1f1;
        }
        .info {
          display: flex;
          gap: 10px;
          align-items: center;
          .image {
            img {
              height: 40px;
              width: 40px;
              border-radius: 40px;
              flex-shrink: 0;
              -webkit-flex-shrink: 0;
              -o-object-fit: cover;
              object-fit: cover;
            }
          }
          .currency-name {
            font-weight: 600;
          }
        }
      }
    }
  }
}

.active {
  background-color: #f1f1f1;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 8px;
}
</style>
