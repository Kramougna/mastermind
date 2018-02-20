<template>
  <div class="base">
    <button v-on:click="newGame" class="start-game-button button">New Game</button>

    <div v-if="isWin">
      <div class="success message">
        <p> You WIN ! </p>
        <p> One more time ?</p>
      </div>
    </div>

    <div v-else-if="isOver">
      <div class="fail message">
        <p>You loose, try again</p>
      </div>
    </div>

    <div v-else-if="isStart" class="mastermind">
      <board-game :board-data='boardData'></board-game>
    <div>

    <hr/>

    <h2>Select colors</h2>
      <ul class="colors">
        <li v-for="(item, index) in color" :key="index">
          <button class="attemp circle choice " v-bind:class="item" v-on:click="addColor(index)"></button>
        </li>
      </ul>
    </div>

    <div>
      <h2>Your choice</h2>
      <ul class="choices">
        <li v-for="(item, index) in attemp" :key="index">
          <p v-bind:class="color[item]" class="attemp circle"></p>
        </li>
      </ul>
    </div>

      <button v-on:click="removeColor" v-bind:disabled="isRemovable" class="remove-button button">Remove</button>
      <button v-on:click="checkAttemp" v-bind:disabled="!isValid || isOver" class="valid-button button">Valid</button>
    </div>
  </div>
</template>

<script>
import BoardGame from '@/components/BoardGame'

export default {
  name: 'Base',
  data () {
    return {
      solution: Array(4),
      color: {
        0: 'blue',
        1: 'red',
        2: 'green',
        3: 'yellow',
        4: 'purple',
        5: 'brown'
      },
      isOver: false,
      isWin: false,
      attemp: [],
      attemps: []
    }
  },
  computed: {
    isValid: function () {
      return (this.attemp && this.attemp.length === 4)
    },
    isRemovable: function () {
      return (!this.attemp || this.attemp.length === 0)
    },
    isStart: function () {
      return !this.solution.includes(undefined)
    },
    boardData () {
      return { attemps: this.attemps, color: this.color, correction_colors: this.correction_colors }
    }
  },
  methods: {
    newGame: function () {
      this.solution = new Array(4).fill().map(() => Math.round(Math.random() * 5))
      this.attemps = []
      this.isOver = false
      this.isWin = false
    },
    addColor: function (color) {
      let attemp = this.attemp
      if (attemp.length < 4) {
        attemp.push(color)
      } else {
        alert('only 4 colors by attemp')
      }
    },
    removeColor: function () {
      let attemp = this.attemp

      if (attemp.length > 0) {
        attemp.pop()
      } else {
        alert('no color to remove')
      }
    },
    checkAttemp: function () {
      let attemp = {}
      let comparativeSolution = this.solution.slice()
      let missmatchColors = []
      const solution = this.solution

      /* set attemp structure for history */
      attemp.response = this.attemp
      attemp.correction = []

      /* check perfect match */
      attemp.response.forEach(function (item, index) {
        if (attemp.response[index] == solution[index]) {
          /* add black token (code 2) to correction */
          attemp.correction.push(2)

          /* remove matching value from comparativeSolution */
          comparativeSolution.splice(index, 1, null)
        } else {
          missmatchColors.push(item)
        }
      })

      /*  with remaining value from attemp, check if value exist in comprative solution */
      /* add one (and only) white token (code 1) by existing value */
      missmatchColors.forEach(function (item, index) {
        if (comparativeSolution.indexOf(parseInt(item)) >= 0) {
          /* missmatch color found, remove from comprative solution to avoid multpile white token */
          comparativeSolution.splice(comparativeSolution.indexOf(parseInt(item)), 1, null)
          /* add white token (code 1) to correction */
          attemp.correction.push(1)
        } else {
          attemp.correction.push(0)
        }
      })

      /* Sort array, player can't have match order  */
      attemp.correction.sort().reverse()
      /* push attemp with correction for history */
      this.attemps.push(attemp)
      this.attemp = []

      if (attemp.correction.every(item => item === 2)) this.isWin = true
      if (this.attemps.length >= 10) this.isOver = true
    }
  },
  components: {
    BoardGame
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  $blue: #167ebf;
  $red: #c6003d;
  $green: #00c618;
  $yellow: #f3ec41;
  $purple: #c23cce;
  $brown:  #4e2c13;
  $black: #000;
  $white: #FFF;
  $dark-grey: #555;
  $grey: #AAA;
  $light-grey: #DDD;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .blue {
    background-color: $blue;
  }

  .red {
    background-color: $red;
  }

  .green {
    background-color: $green;
  }

  .yellow {
    background-color: $yellow;
  }

  .purple {
    background-color: $purple;
  }

  .brown {
    background-color: $brown;
  }

  .black {
    background-color: $black;
  }

  .grey {
    background-color: $light-grey;
  }

  .white {
    background-color: $white;
  }

  table {
    border:3px solid $dark-grey;
    border-radius: .5rem;
    margin: 2rem auto;
    padding:2rem;
    width: 30%;
  }

  .circle {
    border:3px solid $grey;
    border-radius: 100%;
  }

  .attemp {
    height: 2rem;
    width: 2rem;
  }

  .correction {
    height: 1rem;
    width: 1rem;
  }

  .choice {
    &:hover {
      border-color: $dark-grey;
    }
  }

  .message {
    border-radius: .5rem;
    border-radius: .5rem;
    text-align: center;
    width: 25%;
    margin: auto;
  }

  .fail {
    border:3px solid $red;
    color: $red;
  }

  .success {
    border:3px solid $green;
    color: $green;
  }

  .button {
    padding:1rem;
    font-weight: bold;
    border-radius: .5rem;
    background-color: $white;

    &:hover {
      color: $white;
    }
  }

  .start-game-button {
    color: $blue;
    border:3px solid $blue;

    &:hover {
      background-color: $blue;
    }
  }

  .remove-button {
    color: $red;
    border:3px solid $red;

    &:hover {
      background-color: $red;
    }
  }


  .valid-button {
    color: $green;
    border:3px solid $green;
    background-color: $white;

    &:hover {
      background-color: $green;
    }
  }
</style>
