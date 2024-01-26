import { useState, useEffect, useCallback } from 'react';

const CHAT_WS_ENDPOINT = 'ws://localhost:9000';

const socket = new WebSocket(CHAT_WS_ENDPOINT);

// A simple hook for connecting with the chat gpt WS server. A more complete implementation
// would include things like auth etc.
export const useChatGPT = () => {
  const [answerText, setAnswerText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [createdAt, setCreatedAt] = useState<number>();

  useEffect(() => {
    socket.addEventListener('open', function () {
      socket.addEventListener('message', (event: WebSocketMessageEvent) => {
        const { data } = event;
        setLoading(() => false);
        if (data === 'FINISHED') {
          setCreatedAt(prevValue => prevValue || Date.now());
        } else {
          setAnswerText(prevAnswerText => prevAnswerText + data);
        }
      });
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendQuery = useCallback((query: string) => {
    // Clear previous answer, createdAt, before submitting new query
    setCreatedAt(undefined);
    setAnswerText('');
    setLoading(true);
    socket.send(query);
  }, []);

  return { answerText, loading, sendQuery, createdAt };
};
