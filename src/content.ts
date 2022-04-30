import { ParagraphLength } from './model';

const BASE_KO =
  '역시 마찬가지로, 단순히 고통이라는 이유 때문에 고통 그 자체를 사랑하거나 추구하거나 소유하려는 자는 없다. 다만 노역과 고통이 아주 큰 즐거움을 선사하는 상황이 때로는 발생하기 때문에 고통을 찾는 사람이 있는 것이다. 간단한 예를 들자면, 모종의 이익을 얻을 수도 없는데 힘든 육체적 노력을 기꺼이 할 사람이 우리들 중에 과연 있겠는가? 하지만 귀찮은 일이 뒤따르지 않는 즐거움을 누리는 것을 선택한 사람, 혹은 아무런 즐거움도 생기지 않는 고통을 회피하는 사람을 누가 탓할 수 있겠는가?';

const BASE_EN =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ex quis elit malesuada convallis. Donec id ex nec nibh venenatis luctus non in nisl. Quisque ultrices ullamcorper nisi tempor placerat. Nunc volutpat at quam nec sollicitudin. Morbi non varius ex. Vestibulum risus nulla, facilisis non tincidunt at, elementum eu tortor. In porta turpis libero, id placerat dui tincidunt non. Ut sed urna vitae odio cursus sodales. Ut vel lacus eget elit tincidunt efficitur. Nam odio lacus, viverra commodo faucibus sit amet, scelerisque ac urna. Sed laoreet massa vehicula, maximus orci non, hendrerit enim. Nullam eget ipsum leo. Cras fringilla viverra felis, vitae faucibus dui. Nunc vitae ex dignissim, gravida diam lobortis, placerat est. Praesent quis sapien lorem.';

export const CONTENT = {
  ko: BASE_KO,
  en: BASE_EN,
};

const TEXT_LENGTH: Record<ParagraphLength, number> = {
  short: 125,
  medium: 160,
  long: 240,
};
export function generateRandomText(params: {
  paragraphCount: number;
  baseSource: string;
  /**
   * short: 125 characters
   * medium: 160 characters
   * long: 240 characters
   */
  paragraphLength: ParagraphLength;
}) {
  let result = '';
  const { paragraphCount, baseSource, paragraphLength } = params;
  const wordArray = baseSource.split(' ');

  for (let i = 0; i < paragraphCount; i++) {
    let paragraph = '';

    for (let i = 0; i < wordArray.length; i++) {
      const nextContent =
        wordArray[Math.floor(Math.random() * wordArray.length)] + ' ';

      if (
        paragraph.length + nextContent.length <
        TEXT_LENGTH[paragraphLength]
      ) {
        paragraph += nextContent;
      }
    }
    result += `${paragraph}\n\n`;
  }

  return result;
}
