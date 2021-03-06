import { UPDATE_TOTAL_POINTS, UPDATE_DICE_GROUP_TOTALS, CLEAR_DICE_GROUPS, NEXT_TURN, NEW_GAME, END_TURN } from '../actions/gameActions';

const initialState = {
  round: 0,
  totalPoints: 0,
  groupTotals: [0, 0],
  turnStarted: false
};

export default function gameInfoBar(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DICE_GROUP_TOTALS:
      const groupTotals = action.gameDice.reduce((totals, {group, value}) => {
        if (group > 0)
          totals[group-1] += value;
        return totals;
      }, [0,0]);

      return Object.assign({}, state, {
        groupTotals
      });

    case UPDATE_TOTAL_POINTS:
      return Object.assign({}, state, {
        totalPoints: action.points
      });

    case CLEAR_DICE_GROUPS:
      return Object.assign({}, state, {
        groupTotals: [0, 0]
      });

    case NEXT_TURN:
      return Object.assign({}, state, {
        turnStarted: true,
        round: ++state.round
      });

    case END_TURN:
      return Object.assign({}, state, {
        turnStarted: false
      });

    case NEW_GAME:
      return Object.assign({}, initialState, {
        turnStarted: true,
        round: 1
      });

    default:
      return state;
  }
}
