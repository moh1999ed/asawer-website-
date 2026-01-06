export default function SimplePage() {
  return (
    <html>
      <head>
        <title>Test - Asawer</title>
      </head>
      <body style={{ margin: 0, padding: '50px', fontFamily: 'Arial', background: 'linear-gradient(135deg, #003135, #20B2AA)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>✅ المشروع يعمل!</h1>
          <p style={{ fontSize: '24px', marginBottom: '40px' }}>إذا رأيت هذه الصفحة، المشروع يعمل بشكل صحيح</p>
          <a href="/ar" style={{ display: 'inline-block', padding: '15px 30px', background: 'white', color: '#003135', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px' }}>
            العودة للصفحة الرئيسية
          </a>
        </div>
      </body>
    </html>
  );
}



