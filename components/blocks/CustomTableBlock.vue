<template>
  <div>
    <div class="table-block"
    :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
      <div class="title">
        {{ renderLocaleField(data, "title", $i18n.locale) }}
      </div>
      <table>
        <tr v-for="(item, idx) in tableData" :key="'table_' + idx">
          <th
            dir="rtl"
            v-for="(itemName, iidex) in item"
            :key="'table_column_' + iidex"
            v-if="idx == 0"
          >
            {{ itemName }}
          </th>
          <td
            dir="rtl"
            v-for="(itemName, iidex) in item"
            :key="'table_column_' + iidex"
            v-if="idx != 0"
          >
            {{ itemName }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { renderLocaleField } from "../../utils/utils";

@Component({
  name: "CustomTableBlock",
  components: {},
})
export default class CustomTableBlock extends Vue {
  @Prop() data;

  renderLocaleField = renderLocaleField;

  get HOST() {
    return this.$config.HOST;
  }

  get tableData() {
    if (this.$i18n.locale == "en") {
      if (!this.data.table_en.data) {
        if (!this.data.table.data) {
          return [];
        } else {
          return this.data.table.data;
        }
      } else {
        return this.data.table_en.data;
      }
    } else {
      if (!this.data.table.data) {
        if (!this.data.table_en.data) {
          return [];
        } else {
          return this.data.table_en.data;
        }
      } else {
        return this.data.table.data;
      }
    }
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.table-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  overflow: hidden;
  overflow-x: scroll;
  .title {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: var(--bg);
}
</style>
