export default function TestPage() {
  return (
    <html>
      <head>
        <title>Test - Asawer</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #003135, #20B2AA)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          padding: '40px'
        }}>
          <h1 style={{ fontSize: '80px', marginBottom: '20px' }}>✅</h1>
          <h2 style={{ fontSize: '40px', marginBottom: '20px' }}>المشروع يعمل!</h2>
          <p style={{ fontSize: '20px' }}>إذا رأيت هذه الصفحة، المشروع يعمل بشكل صحيح</p>
        </div>
      </body>
    </html>
  );
}



