<?php

namespace Database\Seeders;

use App\Models\AvailablePosition;
use App\Models\JobVacancy;
use Illuminate\Database\Seeder;

class JobVacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $vacancies = [
            [
                'job_category_id' => 1,
                'company' => 'PT. Maju Mundur Sejahtera',
                'address' => 'Jl. Gotong Royong No. 1',
                'description' => 'Lowongan pekerjaan bidang IT',
                'positions' => [
                    ['position' => 'Community Manager', 'capacity' => 2, 'apply_capacity' => 15],
                    ['position' => 'Community Officer', 'capacity' => 3, 'apply_capacity' => 10],
                ],
            ],
            [
                'job_category_id' => 1,
                'company' => 'PT. Teknologi Nusantara',
                'address' => 'Jl. Sudirman No. 5',
                'description' => 'Lowongan pekerjaan bidang Software',
                'positions' => [
                    ['position' => 'Web Developer', 'capacity' => 2, 'apply_capacity' => 20],
                    ['position' => 'UI/UX Designer', 'capacity' => 1, 'apply_capacity' => 8],
                ],
            ],
            [
                'job_category_id' => 1,
                'company' => 'PT. Digital Cipta',
                'address' => 'Jl. Ahmad Yani No. 3',
                'description' => 'Lowongan pekerjaan bidang Digital',
                'positions' => [
                    ['position' => 'Backend Developer', 'capacity' => 3, 'apply_capacity' => 12],
                    ['position' => 'DevOps Engineer', 'capacity' => 2, 'apply_capacity' => 7],
                ],
            ],

            [
                'job_category_id' => 2,
                'company' => 'PT. Bangun Jaya',
                'address' => 'Jl. Diponegoro No. 10',
                'description' => 'Lowongan pekerjaan bidang konstruksi',
                'positions' => [
                    ['position' => 'Site Engineer', 'capacity' => 2, 'apply_capacity' => 20],
                    ['position' => 'Project Manager', 'capacity' => 1, 'apply_capacity' => 8],
                ],
            ],
            [
                'job_category_id' => 2,
                'company' => 'PT. Konstruksi Mandiri',
                'address' => 'Jl. Veteran No. 7',
                'description' => 'Lowongan pekerjaan bidang bangunan',
                'positions' => [
                    ['position' => 'Arsitek', 'capacity' => 2, 'apply_capacity' => 10],
                    ['position' => 'Sipil Engineer', 'capacity' => 3, 'apply_capacity' => 15],
                ],
            ],
            [
                'job_category_id' => 2,
                'company' => 'PT. Graha Persada',
                'address' => 'Jl. Pemuda No. 12',
                'description' => 'Lowongan pekerjaan bidang properti',
                'positions' => [
                    ['position' => 'Quantity Surveyor', 'capacity' => 2, 'apply_capacity' => 9],
                    ['position' => 'Safety Officer', 'capacity' => 1, 'apply_capacity' => 6],
                ],
            ],

            [
                'job_category_id' => 3,
                'company' => 'PT. Green Nusantara',
                'address' => 'Jl. Kaliurang No. 15',
                'description' => 'Lowongan pekerjaan bidang lingkungan',
                'positions' => [
                    ['position' => 'Environmental Analyst', 'capacity' => 3, 'apply_capacity' => 12],
                    ['position' => 'Land Surveyor', 'capacity' => 2, 'apply_capacity' => 9],
                ],
            ],
            [
                'job_category_id' => 3,
                'company' => 'PT. Agro Sejahtera',
                'address' => 'Jl. Magelang No. 20',
                'description' => 'Lowongan pekerjaan bidang pertanian',
                'positions' => [
                    ['position' => 'Agronomist', 'capacity' => 2, 'apply_capacity' => 8],
                    ['position' => 'Farm Manager', 'capacity' => 1, 'apply_capacity' => 5],
                ],
            ],
            [
                'job_category_id' => 3,
                'company' => 'PT. Alam Lestari',
                'address' => 'Jl. Palagan No. 8',
                'description' => 'Lowongan pekerjaan bidang konservasi',
                'positions' => [
                    ['position' => 'Conservation Officer', 'capacity' => 2, 'apply_capacity' => 10],
                    ['position' => 'Wildlife Researcher', 'capacity' => 1, 'apply_capacity' => 6],
                ],
            ],

            [
                'job_category_id' => 4,
                'company' => 'PT. Kreasi Nusantara',
                'address' => 'Jl. Malioboro No. 1',
                'description' => 'Lowongan pekerjaan bidang desain',
                'positions' => [
                    ['position' => 'Graphic Designer', 'capacity' => 2, 'apply_capacity' => 15],
                    ['position' => 'Illustrator', 'capacity' => 1, 'apply_capacity' => 8],
                ],
            ],
            [
                'job_category_id' => 4,
                'company' => 'PT. Seni Budaya',
                'address' => 'Jl. Prawirotaman No. 5',
                'description' => 'Lowongan pekerjaan bidang seni',
                'positions' => [
                    ['position' => 'Art Director', 'capacity' => 1, 'apply_capacity' => 10],
                    ['position' => 'Craft Designer', 'capacity' => 3, 'apply_capacity' => 12],
                ],
            ],
            [
                'job_category_id' => 4,
                'company' => 'PT. Studio Kreatif',
                'address' => 'Jl. Dagen No. 9',
                'description' => 'Lowongan pekerjaan bidang kreatif',
                'positions' => [
                    ['position' => 'Motion Designer', 'capacity' => 2, 'apply_capacity' => 7],
                    ['position' => 'Video Editor', 'capacity' => 2, 'apply_capacity' => 11],
                ],
            ],
        ];

        foreach ($vacancies as $vac) {
            $positions = $vac['positions'];
            unset($vac['positions']);

            $vacancy = JobVacancy::create($vac);

            foreach ($positions as $pos) {
                AvailablePosition::create([
                    'job_vacancy_id' => $vacancy->id,
                    'position' => $pos['position'],
                    'capacity' => $pos['capacity'],
                    'apply_capacity' => $pos['apply_capacity'],
                ]);
            }
        }
    }
}
