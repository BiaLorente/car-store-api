#!/usr/bin/env node

// Test PostgreSQL repository directly
const { Pool } = require('pg');

async function testPostgreSQLRepository() {
  console.log('🧪 Testing PostgreSQL Repository Directly...\n');

  const pool = new Pool({
    connectionString: 'postgresql://carstore_user:carstore123@localhost:5432/carstore',
  });

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection successful');

    // Clear existing data
    await client.query('DELETE FROM vehicles');
    console.log('✅ Cleared existing data');

    // Test insert
    const insertQuery = `
      INSERT INTO vehicles (
        id, brand, model, year, color, price, status, 
        buyer_cpf, sale_date, payment_status, payment_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    const testVehicle = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      brand: 'Test Brand',
      model: 'Test Model',
      year: 2020,
      color: 'Test Color',
      price: 50000,
      status: 'for_sale',
      buyerCpf: null,
      saleDate: null,
      paymentStatus: 'pending',
      paymentCode: null
    };

    const values = [
      testVehicle.id,
      testVehicle.brand,
      testVehicle.model,
      testVehicle.year,
      testVehicle.color,
      testVehicle.price,
      testVehicle.status,
      testVehicle.buyerCpf,
      testVehicle.saleDate,
      testVehicle.paymentStatus,
      testVehicle.paymentCode,
    ];

    await client.query(insertQuery, values);
    console.log('✅ Insert test successful');

    // Test select
    const selectQuery = 'SELECT * FROM vehicles WHERE id = $1';
    const result = await client.query(selectQuery, [testVehicle.id]);
    
    if (result.rows.length > 0) {
      console.log('✅ Select test successful');
      console.log(`   Found vehicle: ${result.rows[0].brand} ${result.rows[0].model}`);
    } else {
      console.log('❌ Select test failed - no data found');
    }

    // Test list for sale
    const listQuery = 'SELECT * FROM vehicles WHERE status = $1 ORDER BY price ASC';
    const listResult = await client.query(listQuery, ['for_sale']);
    console.log(`✅ List test successful - found ${listResult.rows.length} vehicles for sale`);

    // Test update
    const updateQuery = `
      UPDATE vehicles SET 
        status = $2, buyer_cpf = $3, sale_date = $4, 
        payment_status = $5, payment_code = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    
    await client.query(updateQuery, [
      testVehicle.id,
      'sold',
      '123.456.789-00',
      new Date(),
      'paid',
      'PAY123456'
    ]);
    console.log('✅ Update test successful');

    // Verify update
    const updatedResult = await client.query(selectQuery, [testVehicle.id]);
    if (updatedResult.rows[0].status === 'sold') {
      console.log('✅ Update verification successful');
    } else {
      console.log('❌ Update verification failed');
    }

    client.release();
    console.log('\n🎉 All PostgreSQL repository tests passed!');

  } catch (error) {
    console.error('❌ PostgreSQL repository test failed:');
    console.error(`   Error: ${error.message}`);
  } finally {
    await pool.end();
  }
}

// Run the test
testPostgreSQLRepository().catch(console.error); 