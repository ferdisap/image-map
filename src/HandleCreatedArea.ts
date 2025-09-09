interface detail_interface {
  detail: {
    file: File | null,
  }
  bubbles: boolean, // Optional: Allows the event to bubble up the DOM tree
  cancelable: boolean // Optional: Allows preventing the default action
}

const detail : detail_interface = {
  detail: {
    file: null
  },
  bubbles: true,
  cancelable:true,
};

const area_manually_drown_event = new CustomEvent('area_manually_drown', detail);

export class HandleCreatedArea {
  static dispatch(targetEl: Element | HTMLDocument, file:File|null) {
    area_manually_drown_event.detail.file = file;
    targetEl.dispatchEvent(area_manually_drown_event);
  }
}