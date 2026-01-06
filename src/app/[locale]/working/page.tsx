export default function WorkingPage() {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>المشروع يعمل - أساور</title>
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #003135 0%, #20B2AA 100%)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          padding: '40px',
          maxWidth: '800px'
        }}>
          <div style={{
            fontSize: '120px',
            marginBottom: '30px',
            animation: 'pulse 2s infinite'
          }}>✅</div>
          <h1 style={{
            fontSize: '48px',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>المشروع يعمل!</h1>
          <p style={{
            fontSize: '24px',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            إذا رأيت هذه الصفحة، المشروع يعمل بشكل صحيح ✅
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/ar" style={{
              padding: '18px 36px',
              background: 'white',
              color: '#003135',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline-block',
              transition: 'transform 0.3s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              الصفحة الرئيسية
            </a>
            <a href="/ar/test" style={{
              padding: '18px 36px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline-block',
              border: '2px solid white',
              transition: 'transform 0.3s'
            }}>
              صفحة الاختبار
            </a>
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
      </body>
    </html>
  );
}



