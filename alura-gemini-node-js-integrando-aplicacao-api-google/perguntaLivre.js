import { GoogleGenerativeAI } from '@google/generative-ai';
import { fazerPergunta } from './pergunta.js';
import { inicializaModelo } from './modelo.js';

const model = await inicializaModelo("gemini-1.5-pro")

export async function perguntar() {

  const prompt = await fazerPergunta("Me faça uma pergunta sobre um determinado destino: ");

  const parts = [
    {text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não ter relação com viagem e turismo, informe que não poder responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas  as categorias que forem solicitadas no momento da pergunta.\n\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos,  culinária, clima, dicas, como chegar, curiosidades."},
    {text: `input: me fale o máximo que você puder sobre o destino ${prompt}`},
    {text: "output: "},
  ];

  const result = await model.generateContent(
    {contents: [{ role: "user", parts }]}
  );
  
  const response = await result.response;
  const text = response.text();
  console.log(text);
}