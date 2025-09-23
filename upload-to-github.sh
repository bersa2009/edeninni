#!/bin/bash

echo "🚀 GitHub'a Proje Yükleme Scripti"
echo "=================================="

# Kullanıcıdan GitHub bilgilerini al
read -p "GitHub kullanıcı adınız: " GITHUB_USERNAME
read -p "Repository adı (bebek-ses-cozucu): " REPO_NAME
REPO_NAME=${REPO_NAME:-bebek-ses-cozucu}

echo ""
echo "📋 Adımlar:"
echo "1. GitHub'da repository oluşturun: https://github.com/new"
echo "   - Repository name: $REPO_NAME"
echo "   - Description: 🍼 Yapay zeka destekli bebek ağlama analizi - React Native (Expo) uygulaması"
echo "   - Public seçin"
echo "   - README, .gitignore ve License eklemeyin (zaten var)"
echo ""
echo "2. Repository oluşturduktan sonra Enter'a basın..."
read

echo "🔄 Git komutları çalıştırılıyor..."

# Git remote ekle
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Ana branch'i main yap
git branch -M main

# Push et
echo "📤 Kod GitHub'a yükleniyor..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Başarılı! Projeniz GitHub'a yüklendi!"
    echo "🔗 Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "📋 Sonraki adımlar:"
    echo "1. Repository'yi ziyaret edin"
    echo "2. About kısmını düzenleyin"
    echo "3. Topics ekleyin: react-native, expo, typescript, baby, ai"
    echo "4. İlk release oluşturun (v1.0.0)"
    echo ""
    echo "🚀 Deployment için:"
    echo "   docs/DEPLOYMENT.md dosyasını okuyun"
else
    echo ""
    echo "❌ Hata oluştu. Lütfen şunları kontrol edin:"
    echo "1. GitHub'da repository oluşturuldu mu?"
    echo "2. GitHub kullanıcı adı doğru mu?"
    echo "3. Git authentication yapıldı mı?"
    echo ""
    echo "🔧 Manuel komutlar:"
    echo "git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    echo "git branch -M main"
    echo "git push -u origin main"
fi