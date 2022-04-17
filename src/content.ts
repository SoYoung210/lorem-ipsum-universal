export const BASE_KO =
  '역시 마찬가지로, 단순히 고통이라는 이유 때문에 고통 그 자체를 사랑하거나 추구하거나 소유하려는 자는 없다. 다만 노역과 고통이 아주 큰 즐거움을 선사하는 상황이 때로는 발생하기 때문에 고통을 찾는 사람이 있는 것이다. 간단한 예를 들자면, 모종의 이익을 얻을 수도 없는데 힘든 육체적 노력을 기꺼이 할 사람이 우리들 중에 과연 있겠는가? 하지만 귀찮은 일이 뒤따르지 않는 즐거움을 누리는 것을 선택한 사람, 혹은 아무런 즐거움도 생기지 않는 고통을 회피하는 사람을 누가 탓할 수 있겠는가?';

export function generateRandomText(params: {
  paragraphCount: number;
  baseSource: string;
}) {
  let result = '';
  const { paragraphCount, baseSource } = params;
  const wordArray = baseSource.split(' ');

  for (let i = 0; i < paragraphCount; i++) {
    for (let i = 0; i < wordArray.length; i++) {
      result += wordArray[Math.floor(Math.random() * wordArray.length)] + ' ';
    }
    result += '\n\n';
  }

  return result;
}
