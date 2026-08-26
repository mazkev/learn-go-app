import React, { useState } from "react";
import {
  Database,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  Table as TableIcon,
  Sparkles
} from "lucide-react";

export default function GormLab() {
  const [users, setUsers] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@gopher.id", role: "Developer", deleted_at: null },
    { id: 2, name: "Siti Rahma", email: "siti@gopher.id", role: "DevOps Lead", deleted_at: null },
    { id: 3, name: "Andi Wijaya", email: "andi@gopher.id", role: "Junior Go Dev", deleted_at: null },
  ]);

  const [generatedSql, setGeneratedSql] = useState("INSERT INTO `users` (`name`,`email`,`role`,`created_at`) VALUES ('Eko Kurniawan','eko@gopher.id','Backend Lead', NOW());");
  const [gormCode, setGormCode] = useState(`newUser := User{
    Name:  "Eko Kurniawan",
    Email: "eko@gopher.id",
    Role:  "Backend Lead",
}
result := db.Create(&newUser)`);
  const [lastActionMessage, setLastActionMessage] = useState("Database diinisialisasi dengan GORM AutoMigrate(&User{})");

  const handleRunCreate = () => {
    const nextId = users.length + 1;
    const names = ["Dewi Sartika", "Rian Hidayat", "Nadia Putri", "Farhan Gopher"];
    const pickedName = names[Math.floor(Math.random() * names.length)];
    const newUser = {
      id: nextId,
      name: pickedName,
      email: `${pickedName.toLowerCase().replace(" ", "")}@gopher.id`,
      role: "Backend Engineer",
      deleted_at: null,
    };

    setUsers((prev) => [...prev, newUser]);
    setGormCode(`newUser := User{
    Name:  "${newUser.name}",
    Email: "${newUser.email}",
    Role:  "Backend Engineer",
}
result := db.Create(&newUser)
fmt.Println("New ID:", newUser.ID)`);
    setGeneratedSql(`INSERT INTO \`users\` (\`name\`,\`email\`,\`role\`,\`created_at\`) VALUES ('${newUser.name}','${newUser.email}','${newUser.role}',NOW());`);
    setLastActionMessage(`✅ Record baru berhasil dibuat dengan ID #${nextId}`);
  };

  const handleRunFind = () => {
    setGormCode(`var activeUsers []User
// GORM otomatis menyaring data soft delete (WHERE deleted_at IS NULL)
db.Where("role LIKE ?", "%Dev%").Find(&activeUsers)`);
    setGeneratedSql(`SELECT * FROM \`users\` WHERE role LIKE '%Dev%' AND \`deleted_at\` IS NULL;`);
    setLastActionMessage(`🔍 Menemukan data pengguna aktif dengan role Dev`);
  };

  const handleRunUpdate = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "Senior Go Architect ⭐" } : u))
    );
    setGormCode(`var user User
db.First(&user, ${id})
db.Model(&user).Update("Role", "Senior Go Architect ⭐")`);
    setGeneratedSql(`UPDATE \`users\` SET \`role\` = 'Senior Go Architect ⭐', \`updated_at\` = NOW() WHERE \`id\` = ${id} AND \`deleted_at\` IS NULL;`);
    setLastActionMessage(`✏️ User ID #${id} berhasil diupdate role-nya`);
  };

  const handleRunSoftDelete = (id) => {
    const nowStr = new Date().toLocaleTimeString();
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, deleted_at: nowStr } : u))
    );
    setGormCode(`var user User
// Soft Delete (GORM mengisi kolom deleted_at tanpa menghapus baris)
db.Delete(&user, ${id})`);
    setGeneratedSql(`UPDATE \`users\` SET \`deleted_at\` = NOW() WHERE \`id\` = ${id};`);
    setLastActionMessage(`🗑️ User ID #${id} berhasil di Soft Delete`);
  };

  const handleResetDb = () => {
    setUsers([
      { id: 1, name: "Budi Santoso", email: "budi@gopher.id", role: "Developer", deleted_at: null },
      { id: 2, name: "Siti Rahma", email: "siti@gopher.id", role: "DevOps Lead", deleted_at: null },
      { id: 3, name: "Andi Wijaya", email: "andi@gopher.id", role: "Junior Go Dev", deleted_at: null },
    ]);
    setLastActionMessage("Database di-reset ke data awal");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-wider mb-1.5">
            <Database size={14} />
            <span>Interactive ORM Lab</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black theme-heading tracking-tight">
            GORM & <span className="gopher-gradient-text">Database Simulator</span>
          </h1>
          <p className="text-xs md:text-sm theme-muted mt-1">
            Pelajari bagaimana method GORM (Create, Where, Update, Soft Delete) memanipulasi database dan meng-generate SQL query.
          </p>
        </div>

        <button
          onClick={handleResetDb}
          className="px-4 py-2 rounded-xl theme-card theme-heading text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <RotateCcw size={14} /> Reset Database
        </button>
      </div>

      {/* Query Presets Toolbar */}
      <div className="flex items-center gap-2 flex-wrap theme-card p-2.5 rounded-2xl shadow-md">
        <span className="text-xs theme-muted font-bold px-2">GORM Presets:</span>
        <button
          onClick={handleRunCreate}
          className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Plus size={14} /> db.Create(&User)
        </button>
        <button
          onClick={handleRunFind}
          className="px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-300 hover:bg-sky-500/20 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Search size={14} /> db.Where().Find()
        </button>
        <button
          onClick={() => handleRunUpdate(1)}
          className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Edit3 size={14} /> db.Model().Update()
        </button>
        <button
          onClick={() => handleRunSoftDelete(2)}
          className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Trash2 size={14} /> db.Delete(&User)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Visual Table (7 cols) */}
        <div className="lg:col-span-7 theme-card rounded-3xl p-7 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold theme-heading flex items-center gap-2">
              <TableIcon size={16} className="text-[#00ADD8]" /> Tabel `users` (SQLite Engine)
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {users.filter((u) => !u.deleted_at).length} Active Records
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl theme-inset shadow-inner">
            <table className="w-full text-left text-xs font-mono">
              <thead className="theme-card-subtle theme-muted border-b border-slate-200 dark:border-white/10 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">DeletedAt (Soft)</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {users.map((u) => {
                  const isDeleted = u.deleted_at !== null;
                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors ${
                        isDeleted ? "opacity-40 line-through bg-rose-500/5" : ""
                      }`}
                    >
                      <td className="p-3.5 font-bold text-[#00ADD8]">#{u.id}</td>
                      <td className="p-3.5 font-bold theme-heading">{u.name}</td>
                      <td className="p-3.5 theme-body">{u.email}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-medium">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5 theme-muted text-[11px]">
                        {u.deleted_at ? (
                          <span className="text-rose-500 font-bold">{u.deleted_at}</span>
                        ) : (
                          "NULL (Aktif)"
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        {!isDeleted ? (
                          <>
                            <button
                              onClick={() => handleRunUpdate(u.id)}
                              title="Update Role"
                              className="p-1.5 rounded-lg hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 transition-colors"
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => handleRunSoftDelete(u.id)}
                              title="Soft Delete"
                              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-600 dark:text-rose-300 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-rose-500 font-bold">Deleted</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-2xl theme-card-subtle text-xs theme-body flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
            <span>{lastActionMessage}</span>
          </div>
        </div>

        {/* Right: Code & Generated SQL Inspector (5 cols) */}
        <div className="lg:col-span-5 theme-card rounded-3xl p-7 space-y-5 flex flex-col shadow-md">
          <h3 className="text-base font-extrabold theme-heading flex items-center gap-2">
            <Sparkles size={16} className="text-pink-500" /> GORM Code & SQL Inspector
          </h3>

          {/* GORM Code */}
          <div className="space-y-2">
            <span className="text-xs theme-muted font-bold uppercase tracking-wider">
              1. Golang GORM Method Call:
            </span>
            <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto whitespace-pre-wrap shadow-inner leading-relaxed">
              {gormCode}
            </pre>
          </div>

          {/* Generated SQL */}
          <div className="space-y-2">
            <span className="text-xs theme-muted font-bold uppercase tracking-wider">
              2. Generated Raw SQL Query:
            </span>
            <pre className="bg-slate-900 text-pink-300 p-4 rounded-2xl border border-pink-500/30 font-mono text-xs overflow-x-auto whitespace-pre-wrap shadow-inner leading-relaxed">
              {generatedSql}
            </pre>
          </div>

          <div className="p-4 rounded-2xl theme-card-subtle text-xs theme-body space-y-1 leading-relaxed">
            <span className="font-bold text-pink-500">💡 Fitur Soft Delete GORM:</span>
            <p>
              Dengan menyematkan <code>gorm.Model</code>, GORM otomatis mengisi timestamp pada kolom <code>deleted_at</code> saat <code>db.Delete()</code> dipanggil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
