import { Card, CardContent } from '@/components/ui/card';

const GameNotification = ({ message, isVisible, type }) => {
  if (!isVisible) return null;

  const bgColor = type === 'round' ? 'bg-blue-500' : 'bg-green-500';

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <Card className={`${bgColor} text-white`}>
        <CardContent className="p-6 text-center">
          <h2 className="text-3xl font-bold mb-2">
            {type === 'round' ? 'New Round!' : 'Action Performed!'}
          </h2>
          <p className="text-xl">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameNotification;