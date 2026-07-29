'use client';

import '@/index.css';
import confetti from 'canvas-confetti';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function App() {
  const handleConfetti = () => {
    confetti();
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl">What's on your mind?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-xs">You can generate any react application using third party modules</p>
          <Button size="sm" onClick={handleConfetti} className="pl-4">
            Got you!
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default App;
