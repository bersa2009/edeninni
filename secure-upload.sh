#!/bin/bash

echo "🔐 Güvenli GitHub Yükleme - edeninni Repository"
echo "=============================================="

# Token'ı güvenli şekilde al
echo "⚠️  GÜVENLİK UYARISI: Eski token'ınızı iptal edin!"
echo "1. GitHub → Settings → Developer settings → Personal access tokens"
echo "2. Eski token'ı delete edin"
echo "3. Yeni token oluşturun (repo yetkisi ile)"
echo ""
read -s -p "🔑 Yeni GitHub Personal Access Token'ınızı girin: " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token boş olamaz!"
    exit 1
fi

# Git config
echo "🔧 Git konfigürasyonu..."
git config --global user.name "bersa2009"
git config --global user.email "your-email@example.com"

# Remote ayarla (token ile)
echo "📡 Repository bağlantısı kuruluyor..."
git remote remove origin 2>/dev/null || true
git remote add origin https://$GITHUB_TOKEN@github.com/bersa2009/edeninni.git

# Branch ayarla
git branch -M main

# Push et
echo "📤 Proje yükleniyor..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 BAŞARILI! Bebek Ses Çözücü projesi güvenli şekilde yüklendi!"
    echo "🔗 Repository: https://github.com/bersa2009/edeninni"
    echo ""
    echo "✅ Yüklenen İçerik:"
    echo "• Complete React Native (Expo) App"
    echo "• Turkish Localization"
    echo "• AI Service Integration Ready"
    echo "• Professional Documentation"
    echo "• CI/CD Pipeline"
    echo "• Production Ready Code"
    echo ""
    echo "🔒 Güvenlik Hatırlatması:"
    echo "• Token'ınızı başkalarıyla paylaşmayın"
    echo "• Düzenli olarak token'ları yenileyin"
    echo "• SSH key kullanımı daha güvenlidir"
else
    echo "❌ Push başarısız! Lütfen şunları kontrol edin:"
    echo "• Token'ın geçerli olduğunu"
    echo "• Repository'ye write access olduğunu"
    echo "• Internet bağlantısını"
fi

# Token'ı temizle (güvenlik için)
unset GITHUB_TOKEN