import Image from 'next/image';

interface BoosterProps {
  image: string;
}

export function Booster({ image }: BoosterProps) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={image}
        alt="Booster"
        width={180}
        height={250}
        className=""
        priority
      />
    </div>
  );
}