<template>
  <div>
    <div class="table-block">
      <div class="title">{{ data.table_caption }}</div>
      <table>
        <tr v-for="(item, idx) in data.data" :key="'table_' + idx">
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

@Component({
  name: "TableBlock",
  components: {},
})
export default class TableBlock extends Vue {
  @Prop() data;

  get HOST() {
    return this.$config.HOST;
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
