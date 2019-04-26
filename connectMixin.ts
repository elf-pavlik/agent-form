export default (uiActor, superClass) => {

  return class extends superClass {

    constructor() {
      super();
      // Map dispatch to events
      if (this.mapEventsToActions) {
        const eventMap = this.mapEventsToActions(uiActor.actions);
        for (const eventType in eventMap) {
          this.addEventListener(eventType, event => {
            event.stopImmediatePropagation()
            eventMap[eventType](event.detail)
          })
        }
      }
      // Map state to props
      if (this.mapStateToProps) {
        const setProps = (props) => {
          for (const prop in props) {
            this[prop] = props[prop]
          }
        }
        const update = (state) => {
          if (!state) return
          setProps(this.mapStateToProps(state))
        }
        // Sync with store
        uiActor.subscribe(update)
        update(uiActor.state)
      }
    }
  }

}
