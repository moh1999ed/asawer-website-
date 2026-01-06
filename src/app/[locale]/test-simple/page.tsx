export default function TestSimplePage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f0f0',
      fontSize: '2rem',
      fontWeight: 'bold'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>✅ الموقع يعمل!</h1>
        <p style={{ fontSize: '1rem', marginTop: '20px' }}>
          إذا رأيت هذه الرسالة، الموقع يعمل بشكل صحيح
        </p>
      </div>
    </div>
  );
}



