-- ============================================================
-- Car Rental Platform — Seed Data
-- Run AFTER schema.sql
-- ============================================================

truncate table public.bookings, public.cars cascade;

-- ------------------------------------------------------------
-- 12 vehicles across all categories
-- (Unsplash placeholder images — swap anytime)
-- ------------------------------------------------------------
insert into public.cars (name, brand, category, price_per_day, seats, transmission, fuel_type, image_url, status, description) values
  ('Corolla',      'Toyota', 'Economy',  45,  5, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', 'available',   'Reliable and fuel-efficient sedan, perfect for city travel and daily commuting.'),
  ('Civic',        'Honda',  'Sedan',    55,  5, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'available',   'Smooth sedan with a premium interior and excellent highway comfort.'),
  ('Land Cruiser', 'Toyota', 'SUV',      120, 7, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800', 'available',   'Full-size SUV with 7 seats — the ideal choice for family trips and long journeys.'),
  ('RAV4',         'Toyota', 'SUV',      95,  5, 'Automatic', 'Hybrid',   'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', 'rented',      'Compact hybrid SUV balancing comfort, space and fuel economy.'),
  ('Model 3',      'Tesla',  'Electric', 100, 5, 'Automatic', 'Electric', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800', 'maintenance', 'All-electric sedan with autopilot and instant acceleration.'),
  ('Model Y',      'Tesla',  'Electric', 130, 5, 'Automatic', 'Electric', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', 'available',   'Electric SUV with long range, panoramic glass roof and big cargo space.'),
  ('5 Series',     'BMW',    'Luxury',   150, 5, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800', 'available',   'Executive luxury sedan for premium business travel.'),
  ('X5',           'BMW',    'Luxury',   180, 5, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', 'rented',      'Luxury SUV combining performance, comfort and presence.'),
  ('Swift',        'Suzuki', 'Economy',  30,  5, 'Manual',    'Petrol',   'https://images.unsplash.com/photo-1591892677028-ce161ecb8c03?w=800', 'available',   'Budget-friendly compact car, easy to park and cheap to run.'),
  ('Accord',       'Honda',  'Sedan',    65,  5, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', 'available',   'Spacious mid-size sedan with a quiet, comfortable ride.'),
  ('Prado',        'Toyota', 'SUV',      140, 7, 'Automatic', 'Diesel',   'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800', 'available',   'Rugged 7-seater diesel SUV built for mountains and road trips.'),
  ('Mustang',      'Ford',   'Luxury',   200, 4, 'Automatic', 'Petrol',   'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', 'available',   'Iconic sports coupe for those who want style and power.');

-- ------------------------------------------------------------
-- 24 historical bookings spread across 2026
-- (gives the dashboard charts and KPIs real data to aggregate)
-- cars are joined by name so reruns are deterministic
-- ------------------------------------------------------------
insert into public.bookings (car_id, customer_name, customer_email, customer_phone, pickup_location, start_date, end_date, total_days, total_price, status, created_at)
select
  c.id,
  v.customer_name,
  v.customer_email,
  v.phone,
  v.pickup_location,
  v.start_date::date,
  (v.start_date::date + v.days)::date,
  v.days,
  c.price_per_day * v.days,
  v.status,
  v.created_at::timestamptz
from (values
  ('Land Cruiser', 'John Doe',     'john@example.com',   '+8801711111101', 'Dhaka Airport', '2026-01-05', 4, 'completed', '2026-01-02'),
  ('Corolla',      'Sarah Lee',    'sarah@example.com',  '+8801711111102', 'Gulshan',       '2026-01-18', 3, 'completed', '2026-01-15'),
  ('Model 3',      'Mike Chen',    'mike@example.com',   '+8801711111103', 'Chattogram',    '2026-02-03', 5, 'completed', '2026-02-01'),
  ('X5',           'Emma Wilson',  'emma@example.com',   '+8801711111104', 'Dhaka Airport', '2026-02-14', 2, 'cancelled', '2026-02-12'),
  ('Prado',        'Rafiq Islam',  'rafiq@example.com',  '+8801711111105', 'Uttara',        '2026-02-25', 7, 'completed', '2026-02-22'),
  ('Civic',        'Nusrat Jahan', 'nusrat@example.com', '+8801711111106', 'Banani',        '2026-03-08', 3, 'completed', '2026-03-05'),
  ('Accord',       'David Brown',  'david@example.com',  '+8801711111107', 'Sylhet',        '2026-03-19', 5, 'completed', '2026-03-16'),
  ('5 Series',     'Aisha Khan',   'aisha@example.com',  '+8801711111108', 'Dhaka Airport', '2026-04-02', 4, 'completed', '2026-03-30'),
  ('Swift',        'Tanvir Ahmed', 'tanvir@example.com', '+8801711111109', 'Mirpur',        '2026-04-15', 2, 'completed', '2026-04-13'),
  ('RAV4',         'Linda Park',   'linda@example.com',  '+8801711111110', 'Cox''s Bazar',  '2026-04-27', 6, 'completed', '2026-04-24'),
  ('Corolla',      'Omar Faruk',   'omar@example.com',   '+8801711111111', 'Khulna',        '2026-05-09', 3, 'completed', '2026-05-06'),
  ('Model Y',      'Priya Sharma', 'priya@example.com',  '+8801711111112', 'Gulshan',       '2026-05-21', 5, 'completed', '2026-05-18'),
  ('X5',           'James Wu',     'james@example.com',  '+8801711111113', 'Dhaka Airport', '2026-06-04', 4, 'completed', '2026-06-01'),
  ('Civic',        'Fatima Noor',  'fatima@example.com', '+8801711111114', 'Uttara',        '2026-06-17', 2, 'completed', '2026-06-15'),
  ('Prado',        'Alex Turner',  'alex@example.com',   '+8801711111115', 'Banani',        '2026-07-02', 7, 'completed', '2026-06-29'),
  ('Land Cruiser', 'Hasan Ali',    'hasan@example.com',  '+8801711111116', 'Chattogram',    '2026-07-15', 3, 'completed', '2026-07-12'),
  ('5 Series',     'Maria Gomez',  'maria@example.com',  '+8801711111117', 'Dhaka Airport', '2026-07-28', 5, 'completed', '2026-07-25'),
  ('Accord',       'Peter Novak',  'peter@example.com',  '+8801711111118', 'Sylhet',        '2026-08-10', 4, 'completed', '2026-08-07'),
  ('Swift',        'Rahim Uddin',  'rahim@example.com',  '+8801711111119', 'Mirpur',        '2026-08-20', 2, 'completed', '2026-08-18'),
  ('Model Y',      'Lucy Chen',    'lucy@example.com',   '+8801711111120', 'Cox''s Bazar',  '2026-08-27', 5, 'active',    '2026-08-24'),
  ('RAV4',         'Sam Roy',      'sam@example.com',    '+8801711111121', 'Gulshan',       '2026-08-29', 3, 'active',    '2026-08-27'),
  ('Model 3',      'Nadia Islam',  'nadia@example.com',  '+8801711111122', 'Dhaka Airport', '2026-09-02', 6, 'approved',  '2026-08-26'),
  ('Corolla',      'Chris King',   'chris@example.com',  '+8801711111123', 'Uttara',        '2026-09-05', 2, 'pending',   '2026-08-28'),
  ('Civic',        'Dina Rana',    'dina@example.com',   '+8801711111124', 'Banani',        '2026-09-08', 4, 'pending',   '2026-08-28')
) as v(car_name, customer_name, customer_email, phone, pickup_location, start_date, days, status, created_at)
join public.cars c on c.name = v.car_name;
