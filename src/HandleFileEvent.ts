export default class HandleFileEvent extends Event {

  protected file: File;
  protected base64: String | ArrayBuffer | null | undefined;
  protected name: String | undefined;
  protected width: Number | undefined;
  protected height: Number | undefined;
  protected lastModified: Number | undefined;
  protected size: Number | undefined;
  protected fileType: String | undefined;

  constructor(file:File){
    super('handlefile');
    this.file = file
  }

  process() :Promise<null>{
    this.lastModified = this.file.lastModified;
    this.name = this.file.name;
    this.size = this.file.size;
    this.fileType = this.file.type;

    const fr = new FileReader();
    const img = document.createElement('img');

    return new Promise((r) => {
      img.loading = 'lazy';
      fr.onload = () => {
        this.base64 = fr.result;
        img.onload = () => {
          this.width = img.width;
          this.height = img.height;
          r(null);
        }
        img.src = this.base64 as string;
      }
      fr.readAsDataURL(this.file);
    })
  }

  static async dispatch(targetEl: HTMLElement|Document, file: File){
    const evt = new HandleFileEvent(file);
    await evt.process();
    targetEl.dispatchEvent(evt);
  }
}