@echo off
echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
venv\Scripts\activate

echo Creating requirements.txt...
(
echo flask
echo flask-cors
echo scikit-learn
echo nltk
echo numpy
echo pandas
) > requirements.txt

echo Installing requirements...
pip install -r requirements.txt

echo Installing NLTK resources...
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"

echo Setup complete!
pause