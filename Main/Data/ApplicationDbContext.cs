using IdentityServer4.EntityFramework.Options;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace LinkCollectionApp.Data
{
  public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
  {
    public ApplicationDbContext(
      DbContextOptions options,
      IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
    {
    }

    public virtual DbSet<ApplicationUser> ApplicationUser { get; set; }
    public virtual DbSet<Collection> Collection { get; set; }
    public virtual DbSet<Element> Element { get; set; }
    public virtual DbSet<SavedCollection> SavedCollection { get; set; }
    public virtual DbSet<SharedCollection> SharedCollection { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<ApplicationUser>(entity =>
      {
        entity.HasIndex(e => e.NormalizedEmail)
            .HasName("EmailIndex");

        entity.HasIndex(e => e.NormalizedUserName)
            .HasName("UserNameIndex")
            .IsUnique();

        entity.Property(e => e.Email).HasMaxLength(256);

        entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

        entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

        entity.Property(e => e.UserName).HasMaxLength(256);
      });

      modelBuilder.Entity<Collection>(entity =>
      {
        entity.ToTable("Collection", "app");

        entity.Property(e => e.CreatedDate)
            .HasColumnType("datetime")
            .HasDefaultValueSql("(getdate())");

        entity.Property(e => e.Description)
            .HasMaxLength(255)
            .IsUnicode(false);

        entity.Property(e => e.IsPublic).HasDefaultValueSql("((0))");

        entity.Property(e => e.Name)
            .HasMaxLength(100)
            .IsUnicode(false);

        entity.Property(e => e.OwnerId)
            .IsRequired()
            .HasMaxLength(450);

        entity.HasOne(d => d.Owner)
            .WithMany(p => p.Collections)
            .HasForeignKey(d => d.OwnerId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__Collectio__Owner__4AB81AF0");
      });

      modelBuilder.Entity<Element>(entity =>
      {
        entity.ToTable("Element", "app");

        entity.Property(e => e.Description)
            .HasMaxLength(255)
            .IsUnicode(false);

        entity.Property(e => e.Link)
            .IsRequired()
            .HasMaxLength(255)
            .IsUnicode(false);

        entity.Property(e => e.Name)
            .HasMaxLength(100)
            .IsUnicode(false);

        entity.Property(e => e.OwnerId)
            .IsRequired()
            .HasMaxLength(450);

        entity.HasOne(d => d.Collection)
            .WithMany(p => p.Elements)
            .HasForeignKey(d => d.CollectionId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__Element__Collect__4E88ABD4");

        entity.HasOne(d => d.Owner)
            .WithMany(p => p.CreatedElements)
            .HasForeignKey(d => d.OwnerId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__Element__OwnerId__4F7CD00D");
      });

      modelBuilder.Entity<SavedCollection>(entity =>
      {
        entity.HasKey(e => new { e.UserId, e.CollectionId })
            .HasName("PK__SavedCol__4056A78C17156444");

        entity.ToTable("SavedCollection", "app");

        entity.HasOne(d => d.Collection)
            .WithMany(p => p.SavedCollections)
            .HasForeignKey(d => d.CollectionId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__SavedColl__Colle__59063A47");

        entity.HasOne(d => d.User)
            .WithMany(p => p.SavedCollections)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__SavedColl__UserI__5812160E");
      });

      modelBuilder.Entity<SharedCollection>(entity =>
      {
        entity.HasKey(e => new { e.UserId, e.CollectionId })
            .HasName("PK__SharedCo__4056A78CB4AA5C4A");

        entity.ToTable("SharedCollection", "app");

        entity.Property(e => e.EditRights).HasDefaultValueSql("((0))");

        entity.Property(e => e.ViewRights).HasDefaultValueSql("((1))");

        entity.HasOne(d => d.Collection)
            .WithMany(p => p.SharedCollections)
            .HasForeignKey(d => d.CollectionId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__SharedCol__Colle__52593CB8");

        entity.HasOne(d => d.User)
            .WithMany(p => p.SharedCollections)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK__SharedCol__UserI__534D60F1");
      });

    }

  }
}
