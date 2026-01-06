export default function MinimalPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #003135, #20B2AA)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>✅</h1>
        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>المشروع يعمل!</h2>
        <p style={{ fontSize: '20px', marginBottom: '40px' }}>إذا رأيت هذه الصفحة، المشروع يعمل بشكل صحيح</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/ar" style={{
            padding: '15px 30px',
            background: 'white',
            color: '#003135',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            الصفحة الرئيسية
          </a>
          <a href="/ar/test" style={{
            padding: '15px 30px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px',
            border: '2px solid white'
          }}>
            صفحة الاختبار
          </a>
        </div>
      </div>
    </div>
  );
}



