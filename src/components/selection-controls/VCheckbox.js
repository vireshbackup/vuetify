﻿import Selectable from '~mixins/selectable'
import Ripple from '~directives/ripple'
import { VFadeTransition } from '~components/transitions'
import VIcon from '~components/icons/VIcon'

export default {
  name: 'v-checkbox',

  components: {
    VFadeTransition,
    VIcon
  },

  directives: {
    Ripple
  },

  mixins: [Selectable],

  data () {
    return {
      inputIndeterminate: this.indeterminate
    }
  },

  props: {
    indeterminate: Boolean
  },

  computed: {
    classes () {
      return this.addColorClassChecks({
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      })
    },
    icon () {
      if (this.inputIndeterminate) {
        return 'indeterminate_check_box'
      } else if (this.isActive) {
        return 'check_box'
      } else {
        return 'check_box_outline_blank'
      }
    }
  },

  render (h) {
    const transition = h('v-fade-transition', [
      h('v-icon', {
        'class': {
          'icon--checkbox': this.icon === 'check_box'
        },
        key: this.icon
      }, this.icon)
    ])

    const ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: Object.assign({}, {
        click: this.toggle
      }, this.$listeners),
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    })

    const data = {
      attrs: {
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
        'aria-label': this.label
      }
    }

    return this.genInputGroup([transition, ripple], data)
  }
}
