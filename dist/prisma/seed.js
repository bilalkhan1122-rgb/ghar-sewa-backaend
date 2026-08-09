"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    const adminPassword = await bcrypt.hash('Admin@123', 12);
    const cities = await Promise.all([
        prisma.city.upsert({
            where: { id: 'city-lahore' },
            update: {},
            create: { id: 'city-lahore', name: 'Lahore' },
        }),
        prisma.city.upsert({
            where: { id: 'city-karachi' },
            update: {},
            create: { id: 'city-karachi', name: 'Karachi' },
        }),
        prisma.city.upsert({
            where: { id: 'city-islamabad' },
            update: {},
            create: { id: 'city-islamabad', name: 'Islamabad' },
        }),
        prisma.city.upsert({
            where: { id: 'city-rawalpindi' },
            update: {},
            create: { id: 'city-rawalpindi', name: 'Rawalpindi' },
        }),
    ]);
    console.log(`✅ Created ${cities.length} cities`);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            phone: '+923001234567',
            passwordHash: adminPassword,
            fullName: 'Admin User',
            role: client_1.UserRole.ADMIN,
            cityId: 'city-lahore',
            status: client_1.UserStatus.ACTIVE,
            profileCompleted: true,
            verificationStatus: client_1.VerificationStatus.APPROVED,
            isActive: true,
        },
    });
    const customerPassword = await bcrypt.hash('Customer@123', 12);
    const customer = await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            phone: '+923007654321',
            passwordHash: customerPassword,
            fullName: 'Test Customer',
            role: client_1.UserRole.CUSTOMER,
            cityId: 'city-karachi',
            address: '123 Main Street, Karachi',
            status: client_1.UserStatus.ACTIVE,
            profileCompleted: true,
            verificationStatus: client_1.VerificationStatus.APPROVED,
            isActive: true,
        },
    });
    const providerPassword = await bcrypt.hash('Provider@123', 12);
    const provider = await prisma.user.upsert({
        where: { email: 'provider@example.com' },
        update: {},
        create: {
            email: 'provider@example.com',
            phone: '+923011122233',
            passwordHash: providerPassword,
            fullName: 'Test Provider',
            role: client_1.UserRole.PROVIDER,
            cityId: 'city-islamabad',
            status: client_1.UserStatus.ACTIVE,
            profileCompleted: false,
            verificationStatus: client_1.VerificationStatus.INCOMPLETE,
            isActive: true,
        },
    });
    await prisma.wallet.upsert({
        where: { userId: customer.id },
        update: {},
        create: { userId: customer.id, type: client_1.WalletType.CUSTOMER },
    });
    await prisma.wallet.upsert({
        where: { userId: provider.id },
        update: {},
        create: { userId: provider.id, type: client_1.WalletType.PROVIDER },
    });
    console.log('✅ Created wallets for customer & provider');
    const categoryData = [
        { name: 'Plumber', slug: 'plumber', icon: '🔧', displayOrder: 1, description: 'Pipe repair, faucet installation, water heater services' },
        { name: 'Electrician', slug: 'electrician', icon: '⚡', displayOrder: 2, description: 'Wiring, switchboard installation, electrical repairs' },
        { name: 'AC Repair', slug: 'ac-repair', icon: '❄️', displayOrder: 3, description: 'Air conditioner repair and maintenance' },
        { name: 'AC Jet Washing', slug: 'ac-jet-washing', icon: '💨', displayOrder: 4, description: 'Deep cleaning of AC units using jet wash' },
        { name: 'Car Wash', slug: 'car-wash', icon: '🚗', displayOrder: 5, description: 'Car cleaning, detailing, and washing services' },
        { name: 'Solar Installation', slug: 'solar-installation', icon: '☀️', displayOrder: 6, description: 'Solar panel system installation and setup' },
        { name: 'Solar Panel Wash', slug: 'solar-panel-wash', icon: '🧹', displayOrder: 7, description: 'Cleaning and maintenance of solar panels' },
        { name: 'Car Tow & Chain', slug: 'car-tow-chain', icon: '🛞', displayOrder: 8, description: 'Vehicle towing and recovery services' },
        { name: 'Vehicle Mechanic', slug: 'vehicle-mechanic', icon: '🔩', displayOrder: 9, description: 'Car, bike, and vehicle repair services' },
        { name: 'Puncture Wala', slug: 'puncture-wala', icon: '🛞', displayOrder: 10, description: 'Tire puncture repair and inflation services' },
        { name: 'Home Painter', slug: 'home-painter', icon: '🎨', displayOrder: 11, description: 'Interior and exterior painting services' },
        { name: 'House Cleaner', slug: 'house-cleaner', icon: '🧹', displayOrder: 12, description: 'Home cleaning, deep cleaning, and sanitization' },
        { name: 'Gardener', slug: 'gardener', icon: '🌿', displayOrder: 13, description: 'Lawn care, gardening, and plant maintenance' },
        { name: 'Mason', slug: 'mason', icon: '🧱', displayOrder: 14, description: 'Brickwork, plastering, and construction services' },
        { name: 'Welder & Iron Worker', slug: 'welder-iron-worker', icon: '⚙️', displayOrder: 15, description: 'Welding, gate making, and iron fabrication' },
        { name: 'Key & Lock Maker', slug: 'key-lock-maker', icon: '🔑', displayOrder: 16, description: 'Lock installation, repair, and key duplication' },
        { name: 'Pest Control', slug: 'pest-control', icon: '🐜', displayOrder: 17, description: 'Pest extermination and prevention services' },
        { name: 'Water Tank Cleaning', slug: 'water-tank-cleaning', icon: '💧', displayOrder: 18, description: 'Overhead and underground water tank cleaning' },
        { name: 'Water Bore & Pump', slug: 'water-bore-pump', icon: '🪣', displayOrder: 19, description: 'Boring, pump installation, and repair services' },
        { name: 'UPS & Battery Fix', slug: 'ups-battery-fix', icon: '🔋', displayOrder: 20, description: 'UPS repair, battery replacement, and maintenance' },
        { name: 'Fridge / Washing Machine Repair', slug: 'fridge-washing-machine-repair', icon: '🧊', displayOrder: 21, description: 'Refrigerator and washing machine repair' },
        { name: 'Load & Unload', slug: 'load-unload', icon: '📦', displayOrder: 22, description: 'Loading, unloading, and moving services' },
        { name: 'Scrap Buyer', slug: 'scrap-buyer', icon: '♻️', displayOrder: 23, description: 'Old scrap, metal, and item buying services' },
        { name: 'Carpenter', slug: 'carpenter', icon: '🪚', displayOrder: 24, description: 'Furniture making, repair, and woodwork' },
        { name: 'Generator Mechanic', slug: 'generator-mechanic', icon: '🔌', displayOrder: 25, description: 'Generator repair, maintenance, and servicing' },
        { name: 'Hair Dresser at Home', slug: 'hair-dresser-at-home', icon: '💇', displayOrder: 26, description: 'Professional hair dressing and styling at home' },
    ];
    let categoriesCreated = 0;
    for (const cat of categoryData) {
        await prisma.serviceCategory.upsert({
            where: { slug: cat.slug },
            update: {},
            create: {
                name: cat.name,
                slug: cat.slug,
                icon: cat.icon,
                description: cat.description,
                displayOrder: cat.displayOrder,
                isActive: true,
            },
        });
        categoriesCreated++;
    }
    console.log(`✅ Created ${categoriesCreated} service categories`);
    console.log('✅ Seeding completed');
    console.log('\n📋 Test Credentials:');
    console.log('===================');
    console.log('Admin User:');
    console.log('  Email:', admin.email);
    console.log('  Password: Admin@123');
    console.log('  Role:', admin.role);
    console.log('\nCustomer:');
    console.log('  Email:', customer.email);
    console.log('  Password: Customer@123');
    console.log('  Role:', customer.role);
    console.log('\nProvider:');
    console.log('  Email:', provider.email);
    console.log('  Password: Provider@123');
    console.log('  Role:', provider.role);
    console.log('\n⚠️  Passwords meet validation requirements:');
    console.log('   - Minimum 8 characters');
    console.log('   - At least one uppercase letter');
    console.log('   - At least one lowercase letter');
    console.log('   - At least one number');
    console.log('   - At least one special character');
}
main()
    .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map