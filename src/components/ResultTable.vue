<template>
  <section>
    <b-table
      :data="isEmpty ? [] : blocks"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
    >
      <template slot-scope="props">
        <b-table-column field="height" label="Height" width="100" numeric>
          <router-link :to="{ path: '/block/' + props.row.height }">{{
            props.row.height
          }}</router-link>
        </b-table-column>

        <b-table-column field="difficulty" label="Difficulty">
          {{ props.row.difficulty }}
        </b-table-column>

        <b-table-column field="block" label="Block">
          {{ props.row.blockid }}
        </b-table-column>

        <b-table-column field="date" label="Date" centered>
          {{
            new Date(props.row.rawblock.timestamp * 1000).toLocaleDateString()
          }}
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
            </p>
            <p>No blocks found.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResultTable extends Vue {
  @Prop({ default: [] })
  blocks!: any[];

  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    };
  }
}
</script>
