<template>
  <div class="game view">
    <div class="game-app-bar">
     <AppBarRow>
        <TichuIcon slot="left" @click="goBack">
         <IconBack/>
        </TichuIcon>
        <TichuIcon slot="right" @click="editGame">
          <IconOptions/>
        </TichuIcon>
        <TichuIcon slot="right">
          <IconStatistics/>
        </TichuIcon>
     </AppBarRow>
     <div class="game-scores game-scores--double">
        <TichuScore
        @clickteam="editTeam(1)"
        :teamName="team1.name"
        score="500"
        players="Alice, Bob"
        state="winner"
        />
        <div class="game-scores__spacer">:</div>
        <TichuScore
        @clickteam="editTeam(2)"
        :teamName="team2.name"
        score="500"
        players="Clyde, Debbie"
       />
     </div>
    </div>
    <div class="game-rounds">
      <TichuRound
        v-for="(round, index) in rounds"
        :key="round.id"
        :id="round.id"
        :roundNumber="(index + 1)"
        :scores="round.scores"
        @round-delete="deleteRound"
        @round-edit="editRound"
      />
    </div>
    <TFab class="game-fab bg-green" @click="newRound">
      <TichuIcon><IconPlus/></TichuIcon>
    </TFab>
  </div>
</template>

<script>
import AppBarRow from '@/components/ui/AppBarRow.vue';
import TichuScore from '@/components/ui/TichuScore.vue';
import TichuRound from '@/components/ui/TichuRound.vue';
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconBack from '@/components/icons/IconBack.vue';
import IconOptions from '@/components/icons/IconOptions.vue';
import IconStatistics from '@/components/icons/IconStatistics.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import TFab from '@/components/ui/TFab.vue';
import DialogText from '@/components/dialog/DialogText.vue';
import DialogConfirm from '@/components/dialog/DialogConfirm.vue';
import EventBus from '@/EventBus';

export default {
  name: 'Game',
  data() {
    return {
      team1: {
        name: 'Team 1',
      },
      team2: {
        name: 'Team 2',
      },
      rounds: [
        {
          id: 1,
          scores: [
            {
              score: -50,
              win: false,
              winLetter: '',
              flags: [
                {
                  success: false,
                  fail: true,
                  letter: 'T',
                }, {
                  success: true,
                  fail: false,
                  letter: 'T',
                },
              ],
            }, {
              score: 50,
              win: true,
              winLetter: 'W',
              flags: [
                {
                  success: true,
                  fail: false,
                  letter: 'T',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          scores: [
            {
              score: 50,
              win: true,
              winLetter: 'W',
              flags: [],
            }, {
              score: 50,
              win: false,
              winLetter: '',
              flags: [],
            },
          ],
        },
      ],
    };
  },
  props: {
    gameId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    goBack() {
      this.$router.replace('/games');
    },
    newRound() {
      this.$router.push(`/game/${this.gameId}/round/0?teamIds=1,2`);
    },
    deleteRound(roundId) {
      this.$modal.show(
        DialogConfirm,
        { content: 'Do you want to delete this round?' },
        { width: '280', height: 'auto' },
      );
    },
    editRound(roundId) {
      this.$router.push(`/game/${this.gameId}/round/${roundId}`);
    },
    editTeam(teamNumber) {
      const teamName = teamNumber === 1 ? this.team1.name : this.team2.name;
      this.$modal.show(
        DialogText,
        { value: teamName, identifier: `team-name-${teamNumber}`, bus: EventBus },
        { width: '280', height: 'auto' },
      );
    },
    editGame() {
      this.$router.push(`/game/${this.gameId}/edit`);
    },
    handleSaveTeam(teamNumber, value) {
      this[`team${teamNumber}`].name = value;
    },
  },
  created() {
    EventBus.$on('team-name-1-save', (msg) => {
      this.handleSaveTeam(1, msg);
    });
    EventBus.$on('team-name-2-save', (msg) => {
      this.handleSaveTeam(2, msg);
    });
  },
  components: {
    TichuIcon,
    IconBack,
    IconPlus,
    IconOptions,
    IconStatistics,
    AppBarRow,
    TichuScore,
    TichuRound,
    TFab,
    DialogText,
    DialogConfirm,
  },
};
</script>
