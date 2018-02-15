<template>
  <div class='board-game'>
    <table class="grey">
      <tr>
        <td colspan="3"><h2>Attemp {{attempCount}} / 10</h2></td>
      </tr>
      <tr v-for="(attemp, index) in attemps">
        <td>
          <p>{{ index +1 }}</p>
        </td>
        <td>
          <ul>
              <li v-for="response in attemp.response">
                <p v-bind:class="color[response]" class="attemp circle"></p>
              </li>
          </ul>
        </td>
        <td>
          <ul>
            <li v-for="correction in attemp.correction">
              <p v-bind:class="correction_colors[correction]" class="correction circle"></p>
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BoardGame',
  props: ['boardData'],
  data () {
    return {
      correction_colors: {
        0: 'grey',
        1: 'white',
        2: 'black'
      }
    }
  },
  computed: {
    attempCount: function () {
      return this.boardData.attemps.length
    },
    attemps: function () {
      return this.boardData.attemps
    },
    color: function () {
      return this.boardData.color
    }
  }
}
</script>
