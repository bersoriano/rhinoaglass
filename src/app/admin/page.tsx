'use client';

import { getAllAgents } from '@/data/agents';
import Link from 'next/link';
import { QrCode, ExternalLink, Copy } from 'lucide-react';
import { useState } from 'react';

export default function AdminQRCodesPage() {
  const agents = getAllAgents();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (url: string, agentId: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(agentId);
    
    // Reset the "copied" state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <QrCode className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              URLs para Códigos QR
            </h1>
          </div>
          <p className="text-gray-600">
            Usa estas URLs para generar códigos QR con tu herramienta externa favorita
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Instrucciones
          </h2>
          <ol className="space-y-2 text-blue-800">
            <li className="flex gap-2">
              <span className="font-semibold">1.</span>
              <span>Copia la URL del agente usando el botón Copiar</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">2.</span>
              <span>Ve a un generador de códigos QR (ej: qr-code-generator.com, qrcode-monkey.com)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">3.</span>
              <span>Pega la URL y genera el código QR</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold">4.</span>
              <span>Descarga en alta resolución y imprime en las tarjetas de presentación</span>
            </li>
          </ol>
        </div>

        {/* Agent URLs List */}
        <div className="space-y-4">
          {agents.map((agent) => {
            const agentUrl = `${baseUrl}/agent?id=${agent.id}`;
            const isCopied = copiedId === agent.id;
            
            return (
              <div
                key={agent.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Agent Info */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {agent.name}
                    </h3>
                    <p className="text-gray-600">{agent.title}</p>
                  </div>
                  <Link
                    href={`/agent?id=${agent.id}`}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Vista previa
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* URL Display */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between gap-4">
                    <code className="text-sm text-gray-700 break-all flex-grow">
                      {agentUrl}
                    </code>
                    <button
                      onClick={() => handleCopy(agentUrl, agent.id)}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                        isCopied
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {isCopied ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>

                {/* Agent ID */}
                <div className="mt-3 text-sm text-gray-500">
                  ID: <span className="font-mono font-semibold">{agent.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Tips */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Recomendaciones</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Genera los códigos QR en alta resolución (al menos 300 DPI para impresión)</li>
            <li>• Prueba escanear el código QR antes de imprimir las tarjetas</li>
            <li>• Considera agregar el logo de Rhino Automotive Glass en el centro del QR</li>
            <li>• Deja suficiente margen blanco alrededor del código QR para mejor lectura</li>
            <li>• Guarda los códigos QR generados en tu carpeta de assets del proyecto</li>
          </ul>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
