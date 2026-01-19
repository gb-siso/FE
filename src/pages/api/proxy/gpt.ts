import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data: body } = JSON.parse(JSON.stringify(req.body));
    let billText = '';
    body.map((item: any, key: number) => {
      billText += `${key + 1}. ${item.bill}\n\n`;
    });

    const apiKey = process.env.API_GPT_KEY;
    const apiUrl = 'https://api.perplexity.ai/chat/completions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content:
              'You are an AI assistant that summarizes bill proposals. Provide summaries in Korean.'
          },
          {
            role: 'user',
            content: `${billText}
            이거 변호별로 1,2,3번 한줄로 가독성 좋게 요약해줘.
            그리고 마지막에는 한 단어로 어떤것과 연관 되어 있는 법안인지,
            한 단어로도 요약해줘
                      
            ##1번 법안
            카테고리 : 환경??
            1.법안내용:
            2.발의이유:
            3.기대효과
                      
            ##2번 법안
            카테고리: 통신??
            1.법안내용:
            2.발의이유:
            3.기대효과

                      
            ##3번 법안
            카테고리: 재난??
            1.법안내용:
            2.발의이유:
            3.기대효과
            
            무조건 이런 형식으로 요약해주세요.
            `
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const result = JSON.parse(text);
    const data = result?.choices[0]?.message?.content;

    return res.status(200).json({ data });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
