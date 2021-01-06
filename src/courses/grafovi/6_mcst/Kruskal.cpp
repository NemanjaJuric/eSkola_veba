#include<iostream>
#include <vector>
using namespace std;
int matrica[5][5]={         { -1, 2, -1, 6,-1 },  
                            { 2, -1, 3, 8, 5 },  
                            { -1, 3, -1, -1, 7 },  
                            { 6, 8, -1, -1, 9 },  
                            { -1, 5, 7, 9, -1 } };

int n=5;
int e1[5], e2[5];
int k;




int Kruskal(){
    vector<int> skup(n); //za skupove
    vector<int> roditelj(n);//za grane 
    int i,j,tezina=0;
    for( i=0;i<n;i++)skup[i]=i; //svaki cvor cini stablo sam za sebe
    
    int levi,desni;//krajevi grane koju trenutno obradjujemo
    for(int p=0;p<n-1;p++){
        // trazimo najmanju granu koja povezuje dva razlicita skupa cvorova
        levi=desni=-1;
        

        //grane prolazimo neopadajuće
        for(i=0;i<n;i++){
            for(j=0;j<n;j++){
                if(skup[i]!=skup[j] && matrica[i][j]!=-1){
                    if(levi==-1){
                        levi=i;
                        desni=j;
                    }
                    else if(matrica[i][j]<matrica[levi][desni]){          
                        levi=i;desni=j; 
                    }
                }
            }    
        }
        
        if(levi==-1) break;
        roditelj[desni]=levi; //dodajemo granu jer povezuje razlicita stabla 
        tezina+=matrica[levi][desni];

        for(i=0;i<n;i++)
            if(skup[i]==skup[desni]) skup[i]=skup[levi]; //azuriramo skup za sve cvorove iz skupa kome pripada desni
    }
    
    cout<<"Minimalno povezujuce stablo cine sledece grane:>"<<endl;
    for(int i=1;i<n;i++){
        cout<<roditelj[i]<<" - "<<i<< " tezina: "<< matrica[roditelj[i]][i] <<endl;
    }
    return tezina;
}



int main(){
    cout<<"Kruskalov algoritam: "<<endl;
    int a=Kruskal();
    cout<<"Ukupna tezina mcst je: "<<a<<endl;


}
