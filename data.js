// ============================================================
// SNU TIMETABLE — ຂໍ້ມູນສຳຮອງ (offline fallback) ແຍກຕາມພາກຮຽນ
// ------------------------------------------------------------
// ແຫຼ່ງຂໍ້ມູນຫຼັກ = Supabase (table "terms").
// ໄຟລ໌ນີ້ໃຊ້ເມື່ອ Supabase ເຊື່ອມຕໍ່ບໍ່ໄດ້ (ອອບລາຍ) ແລະ ເປັນ backup
// ທີ່ອ່ານ/ແກ້ງ່າຍ. ແຕ່ລະພາກຮຽນເກັບແຍກກັນໃນ array "terms".
//
// ໂຄງສ້າງ 1 ພາກຮຽນ:
//   id         : ໂຄ້ດເສພາະ (ກົງກັບ id ໃນ Supabase)
//   label      : ຊື່ສະແດງ (ເຊັ່ນ "ພາກຮຽນທີ II · 2025-2026")
//   is_current : true ສຳລັບພາກຮຽນປັດຈຸບັນ (ມີໄດ້ອັນດຽວ)
//   data       : { subjects, schedule, classes, meta }
//        subjects     : ລາຍການວິຊາ (id ເປັນຕົວເລກ, ບໍ່ຊ້ຳ)
//        schedule     : "ວັນ-ສາຂາ-ດັດສະນີຄາບ" => subjectId  (ຄາບ 1=0, 2=1, ...)
//        roomSchedule : "ວັນ-ສາຂາ-ດັດສະນີຄາບ" => ຊື່ຫ້ອງ (override; ວ່າງ = ໃຊ້ຫ້ອງຂອງວິຊາ)
//        rooms        : array ຊື່ຫ້ອງຮຽນ (ແກ້ໄຂໄດ້; ໃຊ້ກວດການທັບຊ້ອນ)
//        teachers     : array ຊື່ອາຈານ (ແກ້ໄຂໄດ້; ອາຈານ 1 ຄົນ ສອນໄດ້ຫຼາຍວິຊາ)
//        classes      : null = ໃຊ້ສາຂາມາດຕະຖານໃນ code; ຫຼື array ສາຂາເອງ
//        meta         : { semester: ຊື່ພາກຮຽນ }
// ============================================================
window.SNU_DATA = {
  version: 3,
  terms: [
    {
      id: 't-2025-2026-s2',
      label: 'ພາກຮຽນທີ II · 2025-2026',
      is_current: true,
      sort_order: 200,
      data: {
        subjects: [
          { id: 1000001, code: '3321', name: 'ພາສາອັງກິດ', room: 'R203', teacher: 'ສຸເທວາ', color: '#38bdf8' }
        ],
        schedule: {
          'mon-1AI-1': 1000001   // ວັນຈັນ · 1AI · ຄາບ 2 · ພາສາອັງກິດ
        },
        roomSchedule: {},          // override ຫ້ອງຕໍ່ຊ່ອງ (ວ່າງ = ໃຊ້ຫ້ອງຂອງວິຊາ)
        rooms: ['R203'],           // ລາຍຊື່ຫ້ອງຮຽນ (ແກ້ໄຂໄດ້ໃນ admin)
        teachers: ['ສຸເທວາ'],      // ລາຍຊື່ອາຈານ (ແກ້ໄຂໄດ້ໃນ admin; 1 ຄົນ→ຫຼາຍວິຊາ)
        classes: null,
        meta: { semester: 'ພາກຮຽນທີ II · 2025-2026' }
      }
    },
    {
      id: 't-2025-2026-s1',
      label: 'ພາກຮຽນທີ I · 2025-2026',
      is_current: false,
      sort_order: 100,
      data: {
        subjects: [],
        schedule: {},
        roomSchedule: {},
        rooms: [],
        teachers: [],
        classes: null,
        meta: { semester: 'ພາກຮຽນທີ I · 2025-2026' }
      }
    }
  ]
};
