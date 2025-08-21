import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
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
          backgroundImage: 'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '40px' }}>✨</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#1e293b',
                margin: 0,
                lineHeight: 1,
              }}
            >
              AgentSynth
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#64748b',
                margin: 0,
              }}
            >
              Synthesize your thoughts, amplify your content
            </p>
          </div>
        </div>
        
        <div
          style={{
            display: 'flex',
            gap: '32px',
            color: '#475569',
            fontSize: '18px',
          }}
        >
          <span>📝 AI Notes</span>
          <span>✍️ Content Drafting</span>
          <span>📊 Smart Summaries</span>
          <span>💰 USDC Payments</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
