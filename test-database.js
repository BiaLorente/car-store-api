#!/usr/bin/env node

// Simple database test script
const { Pool } = require('pg');

async function testDatabase() {
  console.log('🔍 Testing PostgreSQL Database Connection...\n');

  // Check environment variables
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://carstore_user:carstore123@localhost:5432/carstore';

  console.log(`📊 Database Configuration:`);
  console.log(`   DATABASE_URL: ${databaseUrl}\n`);

  console.log('🗄️ Testing PostgreSQL Connection...\n');

  const pool = new Pool({
    connectionString: databaseUrl,
  });

  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection successful!');

    // Test query
    const result = await client.query('SELECT NOW() as current_time');
    console.log(`✅ Database query successful: ${result.rows[0].current_time}`);

    // Check if vehicles table exists
    const tableResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'vehicles'
      );
    `);

    if (tableResult.rows[0].exists) {
      console.log('✅ Vehicles table exists');
      
      // Count vehicles
      const countResult = await client.query('SELECT COUNT(*) FROM vehicles');
      console.log(`📊 Total vehicles in database: ${countResult.rows[0].count}`);
    } else {
      console.log('⚠️  Vehicles table does not exist');
      console.log('   The table will be created automatically when the app starts');
    }

    client.release();
    console.log('\n🎉 Database test completed successfully!');

  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check if DATABASE_URL is correct');
    console.error('   2. Verify database server is running');
    console.error('   3. Check network connectivity');
    console.error('   4. Verify credentials');
  } finally {
    await pool.end();
  }
}

// Run the test
testDatabase().catch(console.error); 