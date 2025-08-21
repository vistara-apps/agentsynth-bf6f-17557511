import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f1f5f9',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div style={{ marginBottom: 20, color: '#1e293b' }}>
          AgentSynth
        </div>
        <div style={{ fontSize: 20, color: '#64748b' }}>
          Synthesize your thoughts, amplify your content
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
