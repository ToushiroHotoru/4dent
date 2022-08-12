import _ from "lodash";

class Elden {
  constructor() {
    this.elden = [
      "пальцы",
      "древо",
      "избранный",
      "кольца",
      "найди",
      "руны",
      "возжечь",
      "власть",
      "путь",
      "сила",
      "смерть",
      "босс",
      "руки",
      "улюлюлюлю",
    ];
    this.madness = [
      "дергать",
      "спускать",
      "в",
      "хомяк самодур",
      "титьки",
      "ухо",
      "ля",
      "ля",
      "ля",
      "ля",
      "ля",
    ];
    this.text = [];
  }

  plot(count, type = "elden") {
    for (let i = 0; i < count; i++) {
      switch (type) {
        case "elden":
          this.text.push(this.elden[_.random(this.elden.length - 1)]);
          break;

        case "madness":
          this.text.push(this.madness[_.random(this.madness.length - 1)]);
          break;

        case "all":
          this.text.push(
            _.concat(this.elden, this.madness)[
              _.random(this.madness.length - 1)
            ]
          );
          break;

        default:
          this.text.push(this.elden[_.random(this.elden.length - 1)]);
          break;
      }
    }
    this.text[0] = _.upperFirst(this.text[0]);
    return _.join(this.text, " ");
  }
}

export { Elden };
