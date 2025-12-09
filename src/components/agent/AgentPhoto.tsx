'use client';

import Image from 'next/image';
import { useState } from 'react';

interface AgentPhotoProps {
  name: string;
  photo: string;
}

export default function AgentPhoto({ name, photo }: AgentPhotoProps) {
  const [imageError, setImageError] = useState(false);
  
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=3b82f6&color=fff&bold=true`;

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-xl flex-shrink-0">
      <Image
        src={imageError ? fallbackUrl : photo}
        alt={name}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
