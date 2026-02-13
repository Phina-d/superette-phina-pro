import "../styles/CGV.css";

export default function CGV() {
  return (
    <div className="cgv-page">
      {/* HEADER */}
      <div className="cgv-header">
        <h1>📜 Conditions Générales de Vente (CGV)</h1>
        <p>Supérette Chez Phina</p>
      </div>

      {/* CONTENU */}
      <div className="cgv-container">
        <section className="cgv-section">
          <h2>1️⃣ Présentation</h2>
          <p>
            La Supérette Chez Phina propose la vente de produits alimentaires,
            d’hygiène, cosmétiques et divers articles du quotidien. Toute
            commande implique l’acceptation sans réserve des présentes CGV.
          </p>
        </section>

        <section className="cgv-section">
          <h2>2️⃣ Produits</h2>
          <p>
            Les produits proposés sont décrits et présentés avec la plus grande
            exactitude possible. Les images sont illustratives et non
            contractuelles.
          </p>
        </section>

        <section className="cgv-section">
          <h2>3️⃣ Prix</h2>
          <p>
            Les prix sont exprimés en Franc CFA (FCFA). La Supérette Chez Phina
            se réserve le droit de modifier ses prix à tout moment, sans
            incidence sur les commandes déjà validées.
          </p>
        </section>

        <section className="cgv-section">
          <h2>4️⃣ Commande</h2>
          <p>
            Les commandes peuvent être effectuées via le site ou directement
            via WhatsApp. La validation d’une commande vaut acceptation des CGV.
          </p>
        </section>

        <section className="cgv-section">
          <h2>5️⃣ Paiement</h2>
          <p>
            Les moyens de paiement acceptés sont : espèces, Orange Money, Wave
            ou paiement à la livraison.
          </p>
        </section>

        <section className="cgv-section">
          <h2>6️⃣ Livraison</h2>
          <p>
            La livraison est assurée à Dakar et environs. Les délais de livraison
            peuvent varier selon la disponibilité des produits et la zone.
          </p>
        </section>

        <section className="cgv-section">
          <h2>7️⃣ Responsabilité</h2>
          <p>
            La Supérette Chez Phina ne saurait être tenue responsable des
            dommages indirects liés à l’utilisation des produits vendus.
          </p>
        </section>

        <section className="cgv-section">
          <h2>8️⃣ Données personnelles</h2>
          <p>
            Les informations collectées sont utilisées uniquement pour le
            traitement des commandes et ne sont jamais revendues.
          </p>
        </section>

        <section className="cgv-section">
          <h2>9️⃣ Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit sénégalais.
          </p>
        </section>
      </div>
    </div>
  );
}
